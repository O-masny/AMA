<?php

namespace App\Filament\Resources\Galleries\Pages;

use App\Filament\Resources\Galleries\GalleryResource;
use Filament\Resources\Pages\CreateRecord;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class CreateGallery extends CreateRecord
{
    protected static string $resource = GalleryResource::class;

    protected function afterCreate(): void
    {
        $record = $this->record;

        error_log("ℹ️ Spuštěno afterCreate pro záznam ID: {$record->id}");

        // Kontrola, jestli je nahraný obrázek
        if (!$record->image) {
            error_log("❌ Žádný obrázek k převedení");
            return;
        }

        $originalPath = storage_path('app/public/galleries/' . $record->image);
        error_log("ℹ️ Kontrola existence souboru: {$originalPath}");

        if (!file_exists($originalPath)) {
            error_log("❌ Soubor neexistuje: {$originalPath}");
            return;
        }

        try {
            // Vytvoříme název WebP souboru
            $originalInfo = pathinfo($record->image);
            $webpFilename = Str::slug($originalInfo['filename']) . '-' . time() . '.webp';
            $webpPath = storage_path('app/public/galleries/' . $webpFilename);

            error_log("ℹ️ Původní soubor: {$record->image}");
            error_log("ℹ️ Nový WebP soubor: {$webpFilename}");

            // Konverze na WebP pomocí Intervention Image
            $manager = new ImageManager(new Driver());
            $image = $manager->read($originalPath);

            // Volitelné: resize
            // $image->resize(1920, 1080, function ($constraint) {
            //     $constraint->aspectRatio();
            //     $constraint->upsize();
            // });

            $image->encode('webp', 90)->save($webpPath);
            error_log("✅ Obrázek uložen jako WebP: {$webpPath}");

            // Smažeme původní soubor až po úspěšném uložení WebP
            if (unlink($originalPath)) {
                error_log("🗑️ Původní soubor smazán: {$originalPath}");
            } else {
                error_log("⚠️ Nepodařilo se smazat původní soubor: {$originalPath}");
            }

            // Aktualizujeme databázi
            $record->update([
                'image' => $webpFilename,
                'file_name' => $webpFilename,
                'slider_image' => $webpFilename,
                'detail_image' => $webpFilename,
            ]);

            error_log("✅ Databáze aktualizována na WebP soubor: {$webpFilename}");

        } catch (\Throwable $e) {
            error_log("❌ Chyba při konverzi do WebP: " . $e->getMessage());
            error_log("Původní cesta: {$originalPath}");

            // Zachováváme původní soubor
            $record->update([
                'file_name' => $record->image,
                'slider_image' => $record->image,
                'detail_image' => $record->image,
            ]);

            error_log("ℹ️ Databáze zachová původní soubor: {$record->image}");
        }
    }
}
