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
        Schema::table('user_books', function (Blueprint $table) {
            $table->dropColumn(['isbn10', 'isbn13', 'description', 'subTitle']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_books', function (Blueprint $table) {
            //
        });
    }
};