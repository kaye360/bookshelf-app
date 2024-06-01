<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_books', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('isbn10');
            $table->string('isbn13');
            $table->string('imageUrl');
            $table->integer('imageWidth');
            $table->integer('imageHeight');
            $table->string('userId');
            $table->integer('rating');
            $table->string('group');
            $table->boolean('isRead');
            $table->string('tags');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_books');
    }
};
