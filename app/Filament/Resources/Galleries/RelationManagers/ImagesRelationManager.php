<?php

namespace App\Filament\Resources\Galleries\RelationManagers;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Tables;
use Filament\Schemas\Schema;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;

class ImagesRelationManager extends RelationManager
{
    protected static string $relationship = 'images';

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            Forms\Components\FileUpload::make('image')
                ->label('Obrázek')
                ->image()
                ->directory('exhibitions')
                ->required()
                ->reorderable()
                ->imageEditor()
                ->panelLayout('grid'),

            Forms\Components\TextInput::make('caption')
                ->label('Popisek')
                ->maxLength(255),

            Forms\Components\TextInput::make('order')
                ->label('Pořadí')
                ->numeric()
                ->default(0)
                ->step(1),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('caption')
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Náhled')
                    ->square(),

                Tables\Columns\TextColumn::make('caption')
                    ->label('Popisek')
                    ->limit(50),

                Tables\Columns\TextColumn::make('order')
                    ->label('Pořadí')
                    ->sortable(),
            ])
            ->headerActions([
                CreateAction::make(),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }
}
