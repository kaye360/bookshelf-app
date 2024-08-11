import { describe, expect, test } from "vitest";
import { formatExternalApiTags } from "./fomatExternalApiTags";

const initialTags = ['tag one', 'tag2', 'tag.three', 'tag number four', 'tag, five', 'tag6', 'tag @@ seven', 'tageight']

const tags = formatExternalApiTags( initialTags )

describe('formatExternalApiTags', () => {

    test('should not have tags with numbers', () => {
        expect( tags ).not.toContain('tag2')
        expect( tags ).not.toContain('tag6')
    })

    test('should not have tags with spaces', () => {
        tags.forEach( tag => {
            expect( tag ).not.toContain(' ')
        })
    })

    test('should be length of 5', () => {
        expect( tags ).toHaveLength(5)
    })

    test('should be length of 2', () => {
        expect( formatExternalApiTags(['one', 'twotwo', 'three']) ).toHaveLength(2)
    })

    test('should return empty array', () => {
        // @ts-expect-error
        expect( formatExternalApiTags(undefined) ).toStrictEqual([])
        // @ts-expect-error
        expect( formatExternalApiTags([{}, 3, 'hello']) ).toStrictEqual([])
    })

    test('should not contain duplicate values', () => {
        expect( formatExternalApiTags(['oneone', 'twotwo', 'three', 'three'])).toHaveLength(3)
    })

    test('should not contain uppercase values', () => {
        formatExternalApiTags(['AAAAA', 'BBBBB', 'CCCCC']).forEach( tag => {
            expect( tag ).not.toContain('A')
            expect( tag ).not.toContain('B')
            expect( tag ).not.toContain('C')
        })
    })
})