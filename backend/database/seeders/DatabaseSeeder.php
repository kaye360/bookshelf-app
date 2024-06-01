<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\SeedersUserBookSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call( UserBookSeeder::class );
        $this->call( UsersSeeder::class );
    }
}
