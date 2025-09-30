<?php

// app/Filament/Resources/Exhibitions/Schemas/ExhibitionForm.php

namespace App\Filament\Resources\Exhibitions\Schemas;

use App\Models\Gallery;
use Filament\Forms;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ExhibitionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')
                ->label('Title')
                ->required(),

            Select::make('galleries')
                ->label('Artworks in this Exhibition')
                ->multiple() // umožní výběr více položek
                ->relationship('galleries', 'title')
                ->preload()
                ->searchable()
                ->createOptionForm([
                    TextInput::make('title')->required(),
                    Forms\Components\FileUpload::make('image')
                        ->image()
                        ->directory('uploads/gallery')
                        ->imageResizeMode('cover')
                        ->imagePreviewHeight('100')
                        ->label('Artwork image')
                        ->required(),
                ]),

            Forms\Components\DatePicker::make('date')
                ->label('Date'),

            TextInput::make('location')
                ->label('Location'),

            Textarea::make('description')
                ->label('Description')
                ->columnSpanFull(),

            TextInput::make('visitors')
                ->numeric()
                ->label('Visitors'),
        ]);
    }
}
