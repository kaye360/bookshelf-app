<?php

namespace Database\Seeders;

use App\Models\UserBook;
use Illuminate\Database\Seeder;

class UserBookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserBook::truncate();

        $faker = \Faker\Factory::create();

        for( $i = 0; $i < 500; $i++ ) {
            UserBook::create([
                'title'       => $faker->text(30),
                'authors'     => $faker->name(),
                'isbn10'      => $faker->isbn10(),
                'isbn13'      => $faker->isbn13(),
                'imageUrl'    => "imageUrl_$i",
                'imageWidth'  => 100,
                'imageHeight' => 100,
                'userId'      => $faker->numberBetween(0,20),
                'rating'      => $faker->numberBetween(0,5),
                'group'       => $i < 15 ? 'owned' : 'wishlist',
                'isRead'      => $faker->boolean(75),
                'isFavourite' => $faker->boolean(),
                'tags'        => '["tag1", "tag2", "tag3"]',
            ]);
        }
    }
}
