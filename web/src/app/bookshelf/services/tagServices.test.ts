import { test, expect, describe } from 'vitest'
import { extractTagsFromInput } from "./tagServices"

describe('app/bookshelf/services/tagServices', () => {
    
    test("should extracts tags into array from input string", () => {
        expect( extractTagsFromInput('burger French-Fries  tacos ++   ice-Cream cheeseCake'))
            .toStrictEqual( ['burger', 'french-fries', 'tacos', '++', 'ice-cream', 'cheesecake'] )
    })

    test('should throw error on input null', () => {
        // @ts-ignore
        expect( () => extractTagsFromInput(null))
            .toThrowError()
    })

    test('should throw error oni input number', () => {
        // @ts-ignore
        expect( () => extractTagsFromInput(123))
            .toThrowError()
    })
})

