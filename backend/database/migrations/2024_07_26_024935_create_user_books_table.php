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
            $table->string('key');
            $table->string('title')->nullable();
            $table->string('imageUrl')->nullable();
            $table->integer('userId');
            $table->string('group');
            $table->boolean('isRead');
            $table->string('tags');
            $table->string('authors')->nullable();
            $table->boolean('isFavourite');
            $table->integer('pageCount');
            $table->string('publishedDate')->nullable();
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
