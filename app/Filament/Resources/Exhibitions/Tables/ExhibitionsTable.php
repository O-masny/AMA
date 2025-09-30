<?php

namespace App\Filament\Resources\Exhibitions\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ExhibitionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('galleries.title')
                    ->label('Artworks')
                    ->badge() // zobrazí hezké značky s názvy
                    ->limit(3) // zobrazí max 3 názvy
                    ->listWithLineBreaks(), // zalomí více názvů pod sebe

                TextColumn::make('date')
                    ->searchable(),
                TextColumn::make('location')
                    ->searchable(),
                TextColumn::make('visitors')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
