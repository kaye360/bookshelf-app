// @vitest-environment jsdom
import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import Tooltip from "./Tooltip"

describe('ToolTip', () => {
    
    render( 
        <Tooltip title="Lorem Ipsum">
            <button>
                Click me
            </button>
        </Tooltip>
    )

    const button = screen.getByRole('button')
    const tooltipMessage = screen.getByText('Lorem Ipsum')

    test('should render Tooltip child', () => {
        expect( button ).toBeDefined()
        expect( button.textContent ).toBe('Click me')
    })

    test('should render Tooltip title', () => {
        expect( tooltipMessage ).toBeDefined()
        expect( tooltipMessage.textContent ).toBe('Lorem Ipsum')
    })

    test('should render Tooltip in correct left position', () => {
        expect( tooltipMessage.style.left ).toBe('10px')
    })

})
