import { test, expect, describe } from 'vitest'
import { extractTags } from './extractTags'

describe('extractTags', () => {
    
    test("should extracts tags into array from input string", () => {
        expect( extractTags('burger French-Fries  tacos ++   ice-Cream cheeseCake'))
            .toStrictEqual( ['burger', 'french-fries', 'tacos', '++', 'ice-cream', 'cheesecake'] )
    })

    test('should throw error on input null', () => {
        // @ts-expect-error
        expect( () => extractTags(null)).toThrowError()
    })

    test('should throw error oni input number', () => {
        // @ts-expect-error
        expect( () => extractTags(123)).toThrowError()
    })
})

