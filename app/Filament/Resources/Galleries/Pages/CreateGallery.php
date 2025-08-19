<?php

namespace App\Filament\Resources\Galleries\Pages;

use App\Filament\Resources\Galleries\GalleryResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;

class CreateGallery extends CreateRecord
{
    protected static string $resource = GalleryResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        Log::info('[mutateFormDataBeforeCreate] Konverze obrázku do WebP spuštěna');

        if (empty($data['image'])) {
            Log::warning('[mutateFormDataBeforeCreate] Pole image není nastaveno');
            return $data;
        }

        $originalRelativePath = $data['image'];
        $originalAbsolutePath = storage_path("app/public/{$originalRelativePath}");

        if (!file_exists($originalAbsolutePath)) {
            Log::warning("Soubor neexistuje: {$originalAbsolutePath}");
            return $data;
        }

        try {
            $filename = Str::slug(pathinfo($originalAbsolutePath, PATHINFO_FILENAME)) . '-' . time() . '.webp';
            $webpRelativePath = 'gallery/' . $filename;
            $webpFullPath = storage_path("app/public/{$webpRelativePath}");

            $manager = new ImageManager(new GdDriver());
            $image = $manager->read($originalAbsolutePath);

            // 💥 Fix: check if WebP is supported
            if (!function_exists('imagewebp')) {
                throw new \RuntimeException('PHP GD nepodporuje WebP. Povolit WebP v GD knihovně.');
            }

            $image->toWebp(90)->save($webpFullPath);

            Log::info("✅ Konverze do WebP úspěšná: {$webpRelativePath}");

            // Odstranit původní soubor
            unlink($originalAbsolutePath);

            Log::info("🧹 Původní soubor odstraněn: {$originalAbsolutePath}");

            // Nastavení nové cesty a jména
            $data['image'] = $webpRelativePath;
            $data['file_name'] = $filename; // 💡 doplnění požadovaného sloupce v DB

        } catch (\Throwable $e) {
            Log::error('❌ Chyba při konverzi do WebP: ' . $e->getMessage());
        }

        return $data;
    }

}
