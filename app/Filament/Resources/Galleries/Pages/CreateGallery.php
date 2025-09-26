<?php

namespace App\Filament\Resources\Galleries\Pages;

use App\Filament\Resources\Galleries\GalleryResource;
use Filament\Resources\Pages\CreateRecord;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Str;
use Intervention\Image\Encoders\WebpEncoder;

class CreateGallery extends CreateRecord
{
    protected static string $resource = GalleryResource::class;

    protected function afterCreate(): void
    {
        $record = $this->record;

        error_log("ℹ️ Spuštěno afterCreate pro záznam ID: {$record->id}");

        // Logneme celý model pro kontrolu
        error_log("🔍 Obsah record->toArray(): " . print_r($record->toArray(), true));

        // Kontrola, jestli je nahraný obrázek
        if (!$record->image) {
            error_log("❌ Žádný obrázek k převedení");
            return;
        }

        // Pozor: $record->image může už obsahovat 'galleries/xxx.jpg'
        $originalPath = storage_path('app/public/' . ltrim($record->image, '/'));
        error_log("ℹ️ Kontrola existence souboru: {$originalPath}");

        if (!file_exists($originalPath)) {
            error_log("❌ Soubor neexistuje na {$originalPath}");
            return;
        }

        try {
            // Vytvoříme název WebP souboru
            $originalInfo = pathinfo($record->image);
            error_log("🔍 Info o původním souboru: " . print_r($originalInfo, true));

            $webpFilename = Str::slug($originalInfo['filename']) . '-' . time() . '.webp';
            $webpPath = storage_path('app/public/galleries/' . $webpFilename);

            error_log("ℹ️ Původní soubor (DB): {$record->image}");
            error_log("ℹ️ Nový WebP soubor (jen jméno): {$webpFilename}");
            error_log("ℹ️ Plná cesta k WebP: {$webpPath}");

            // Konverze na WebP pomocí Intervention Image
            $manager = new ImageManager(new Driver());
            $image = $manager->read($originalPath);
            error_log("✅ Obrázek načten pomocí Intervention");

            $image->encode(new WebpEncoder(quality: 90))
                ->save($webpPath);
            error_log("✅ Obrázek uložen jako WebP: {$webpPath}");

            // Smažeme původní soubor až po úspěšném uložení WebP
            if (@unlink($originalPath)) {
                error_log("🗑️ Původní soubor smazán: {$originalPath}");
            } else {
                error_log("⚠️ Nepodařilo se smazat původní soubor: {$originalPath}");
            }

            // Aktualizujeme databázi
            $record->update([
                'image' => 'galleries/' . $webpFilename,
                'file_name' => $webpFilename,
                'slider_image' => $webpFilename,
                'detail_image' => $webpFilename,
            ]);

            error_log("✅ Databáze aktualizována na WebP soubor: {$webpFilename}");

        } catch (\Throwable $e) {
            error_log("❌ Chyba při konverzi do WebP: " . $e->getMessage());
            error_log("📂 Trace: " . $e->getTraceAsString());
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
