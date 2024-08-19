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
        unset($tag);

        $tags_flattend   = array_merge([], ...$tags);
        $tags_unique     = array_unique( $tags_flattend );
        $tags_count      = count( $tags_unique );
        $tags_count_max  = $tags_count < 10 ? $tags_count : 10;

        if( count($tags_unique) === 0 ) {
            return $tags_unique;
        }

        $tags_randomized = array_rand(
            array_flip( $tags_unique ),
            $tags_count_max
        );

        return $tags_randomized;
    }

    public function getBooks(mixed $user)
    {
        return UserBook::select(['key', 'title', 'imageUrl', 'authors', 'pageCount'])
            ->where('userId', $user->id)
            ->inRandomOrder()
            ->take(18)
            ->get();
    }

    public function getTotalBooks(mixed $user)
    {
        return UserBook::where('userId', $user->id)->count();
    }
}
