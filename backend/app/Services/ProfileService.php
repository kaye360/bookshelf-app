<?php

namespace App\Services;

class ProfileService {

    public function getTags(mixed $db_tags) {

        $tags = [];

        foreach ($db_tags as &$tag) {
            array_push($tags, json_decode( $tag['tags'] ));
        }
        unset($topic);

        $tags = array_merge([], ...$tags);
        $tags = array_unique( $tags );
        $tags = array_rand( array_flip( $tags ), 10 );

        return $tags;
    }
}
