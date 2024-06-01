<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::truncate();

        $faker    = \Faker\Factory::create();
        $password = Hash::make('123456');

        for( $i = 0; $i < 20; $i++ ) {
            User::create([
                'name'     => $faker->name(),
                'handle'   => $faker->userName(),
                'email'    => $faker->email(),
                'password' => $password,
            ]);
        }
    }
}
