// @vitest-environment jsdom
import { render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import NavLink from "./NavLink"
import { MemoryRouter } from "react-router-dom"

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal() as object
    return {
        ...actual,
        useLocation : () => ({
            pathname : '/test',
        }),
    }
})

describe('NavLink', () => {

    test('should render isActive NavLink', () => {

        const view = render( 
            <MemoryRouter> 
                <NavLink to="/test">Link</NavLink> 
            </MemoryRouter>
        )

        const link = screen.getByRole('link')
        expect( link ).toBeDefined()
        expect( link.dataset.testingisactive ).toBe("true")

        view.unmount()
    })  

    test('should render !isActive NavLink', () => {

        const view = render( 
            <MemoryRouter> 
                <NavLink to="/notActive">Link</NavLink> 
            </MemoryRouter>
        )

        const link = screen.getByRole('link')
        expect( link ).toBeDefined()
        expect( link.dataset.testingisactive ).toBe("false")
        
        view.unmount()
    })

})