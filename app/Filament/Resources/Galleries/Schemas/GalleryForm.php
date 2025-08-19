<?php

namespace App\Filament\Resources\Galleries\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class GalleryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->image()
                    ->directory('galleries')
                    ->required(),
                TextInput::make('category'),
                TextInput::make('technique'),
                TextInput::make('dimensions'),
                TextInput::make('year')
                    ->numeric(),
                Toggle::make('available')
                    ->required(),
                TextInput::make('price')
                    ->numeric()
                    ->prefix('$'),
                Textarea::make('story')
                    ->columnSpanFull(),
            ]);
    }
}
