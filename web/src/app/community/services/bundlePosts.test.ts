import { describe, expect, test } from "vitest";
import { bundlePosts } from "./bundlePosts";
import { communityPostsMock } from "../api/communityPosts.mock";

const bundledPosts = bundlePosts(communityPostsMock)

describe('bundlePosts', () => {

    test('should return empty array', () => {
        // @ts-expect-error
        expect( bundlePosts('undefined') ).toStrictEqual([])
        expect( bundlePosts(undefined) ).toStrictEqual([])
    })

    test('should return array of arrays with key and title prop', () => {
        bundledPosts.forEach( singleBundledPost => {
            singleBundledPost.forEach( post => {
                expect( post ).toHaveProperty('key')
                expect( post ).toHaveProperty('title')
            } )
        })
    })

})