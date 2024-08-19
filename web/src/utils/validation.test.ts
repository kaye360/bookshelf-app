import { describe, expect, test } from "vitest";
import { isArray, isArrayOfStrings, isJson, isNumber, isObject, isString, objectLength } from "./validation";

describe('isString', () => {

    test('should return true', () => {
        expect( isString('') ).toBe(true)
        expect( isString('hello') ).toBe(true)
        expect( isString('hello', { includeEmpty : true}))
        expect( isString('', { includeEmpty : true}))
    })

    test('should return false', () => {
        // @ts-expect-error
        expect( isString() ).toBe(false)
        expect( isString(null) ).toBe(false)
        expect( isString(undefined) ).toBe(false)
        expect( isString([]) ).toBe(false)
        expect( isString({}) ).toBe(false)
        expect( isString(() => {}) ).toBe(false)
        expect( isString('', { includeEmpty : false}))
    })
})

describe('isNumber', () => {

    test('should be true', () => {
        expect( isNumber(1) ).toBe(true)
        expect( isNumber(0) ).toBe(true)
        expect( isNumber(-12) ).toBe(true)
    })

    test('should be false', () => {
        // @ts-expect-error
        expect( isNumber() ).toBe(false)
        expect( isNumber('') ).toBe(false)
        expect( isNumber('hello') ).toBe(false)
        expect( isNumber([]) ).toBe(false)
        expect( isNumber({}) ).toBe(false)
        expect( isNumber(null) ).toBe(false)
        expect( isNumber(undefined) ).toBe(false)
    })
    
})

describe('isArray', () => {

    test('should be true', () => {
        expect( isArray([]) ).toBe(true)
        expect( isArray([1, 2, 'three']) ).toBe(true)
    })

    test('should be false', () => {
        // @ts-expect-error
        expect( isArray() ).toBe(false)
        expect( isArray(undefined) ).toBe(false)
        expect( isArray(null) ).toBe(false)
        expect( isArray('string') ).toBe(false)
        expect( isArray(456) ).toBe(false)
        expect( isArray({}) ).toBe(false)
    })
    
})

describe('isArrayOfStrings', () => {

    test('should be true', () => {
        expect( isArrayOfStrings([]) ).toBe(true)
        expect( isArrayOfStrings(['']) ).toBe(true)
        expect( isArrayOfStrings(['a', 'b', 'c', "D"]) ).toBe(true)
    })

    test('should be false', () => {
        // @ts-expect-error
        expect( isArrayOfStrings() ).toBe(false)
        expect( isArrayOfStrings([1, '2', '3']) ).toBe(false)
        expect( isArrayOfStrings(null) ).toBe(false)
        expect( isArrayOfStrings(undefined) ).toBe(false)
        expect( isArrayOfStrings( [{key : 'value'}]) ).toBe(false)
    })
    
})

describe('isObject', () => {

    test('should be true', () => {
        expect( isObject({}) ).toBe(true)
        expect( isObject({'key' : 'value'}) ).toBe(true)
    })

    test('should be false', () => {
        // @ts-expect-error
        expect( isObject() ).toBe(false)
        expect( isObject(null) ).toBe(false)
        expect( isObject(undefined) ).toBe(false)
        expect( isObject('string') ).toBe(false)
        expect( isObject(123) ).toBe(false)
        expect( isObject([]) ).toBe(false)
    })
    
})

describe('objectLength', () => {

    test('should be give correct length', () => {
        expect( objectLength({}) ).toBe(0)
        expect( objectLength({a:1}) ).toBe(1)
        expect( objectLength({a:1, b:2, c:3, d:3}) ).toBe(4)
        expect( objectLength({a:1, b:2, c:3, d: {e:4, f:5 }}) ).toBe(4)
        expect( objectLength( {a:1, b:2, c:3, d: {e:4, f:5 }} )).toBe(4)
    })

    test('should throw error (invalid props)', () => {
        // @ts-expect-error
        expect( () => objectLength(null) ).toThrowError()
        // @ts-expect-error
        expect( () => objectLength(undefined) ).toThrowError()
        // @ts-expect-error
        expect( () => objectLength('string') ).toThrowError()
        expect( () => objectLength([1,2,3]) ).toThrowError()
    })


})

describe('isJson', () => {

    test('should be true', () => {
        expect( isJson(JSON.stringify({key : 'value'})) ).toBe(true)
        expect( isJson(JSON.stringify(['string'])) ).toBe(true)
        expect( isJson(JSON.stringify('string')) ).toBe(true)
        expect( isJson(JSON.stringify(null)) ).toBe(true)
        expect( isJson(JSON.stringify(123)) ).toBe(true)
    })
    
    test('should be false', () => {
        expect( isJson(null) ).toBe(false)
        expect( isJson(undefined) ).toBe(false)
        expect( isJson('string') ).toBe(false)
        expect( isJson(123) ).toBe(false)
        expect( isJson([]) ).toBe(false)
        expect( isJson({}) ).toBe(false)
    })
})