<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exhibition_gallery', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exhibition_id')->constrained()->onDelete('cascade');
            $table->foreignId('gallery_id')->constrained()->onDelete('cascade');
            $table->integer('order')->nullable(); // pro custom pořadí obrazů ve výstavě
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exhibition_gallery');
    }
};
