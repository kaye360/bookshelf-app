// @vitest-environment jsdom
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import H2 from "./H2"

describe('H2', () => {
    
    test('should render h2 with children', () => {
        render( <H2>Heading</H2>)
        expect( screen.getByRole('heading').textContent ).toBe('Heading')
        expect( screen.getByRole('heading') ).toBeInstanceOf(HTMLHeadingElement)
    })

})
