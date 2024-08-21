// @vitest-environment jsdom
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import H1 from "./H1"

describe('H1', () => {
    
    test('should render h1 with children', () => {
        render( <H1>Heading</H1>)
        expect( screen.getByRole('heading').textContent ).toBe('Heading')
        expect( screen.getByRole('heading') ).toBeInstanceOf(HTMLHeadingElement)
    })

})
