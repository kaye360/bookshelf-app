import { test, expect, describe } from 'vitest'
import { extractTagsFromInput } from "./tagServices"

describe('extractTagsFromInput', () => {
    
    test("should extracts tags into array from input string", () => {
        expect( extractTagsFromInput('burger French-Fries  tacos ++   ice-Cream cheeseCake'))
            .toStrictEqual( ['burger', 'french-fries', 'tacos', '++', 'ice-cream', 'cheesecake'] )
    })

    test('should throw error on input null', () => {
        // @ts-expect-error
        expect( () => extractTagsFromInput(null))
            .toThrowError()
    })

    test('should throw error oni input number', () => {
        // @ts-expect-error
        expect( () => extractTagsFromInput(123))
            .toThrowError()
    })
})

