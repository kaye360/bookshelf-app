<?php

namespace App\Services;

use App\Models\UserBook;

class ProfileService {

    public function getTags(mixed $user) {

        $dbTags = UserBook::select(['tags'])
        ->where('userId', $user->id)
        ->get();

        $tags = [];

        foreach ($dbTags as &$tag) {
            array_push($tags, json_decode( $tag['tags'] ));
        }
        unset($topic);

        $tags = array_merge([], ...$tags);
        $tags = array_unique( $tags );
        $tags = array_rand( array_flip( $tags ), 10 );

        return $tags;
    }

    public function getBooks(mixed $user)
    {
        return UserBook::select(['key', 'title', 'imageUrl', 'authors', 'pageCount'])
            ->where('userId', $user->id)
            ->inRandomOrder()
            ->take(20)
            ->get();
    }
}
