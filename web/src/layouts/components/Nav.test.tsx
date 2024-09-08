// @vitest-environment jsdom
import { describe, expect, test, vi } from "vitest"
import { useStore } from "../../store/store"
import { render, screen } from "@testing-library/react"
import Nav from "./Nav"
import { navLinksMock } from "./NavLinks.mock"
import { MemoryRouter } from "react-router-dom"

vi.mock('../../store/store')

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal() as object
    return {
        ...actual,
        useLocation : () => ({
            pathname : '/test',
        }),
    }
})

describe('Nav', () => {

    test('should render logged in user nav links', () => {

        vi.mocked(useStore).mockReturnValue({
            auth : { isAuth : true, user : { handle : 'userHandle'} },
        })

        const view = render( 
            <MemoryRouter>
                <Nav navLinks={navLinksMock} /> 
            </MemoryRouter> 
        )

        expect( screen.getByText(/Link1/) ).toBeDefined()
        expect( screen.getByText(/Link2/) ).toBeDefined()
        expect( screen.queryByText(/Link3/) ).toBeNull()
        expect( screen.queryByText(/Link4/) ).toBeNull()
        expect( screen.getByText(/Link5/) ).toBeDefined()
        expect( screen.getByText(/Link6/) ).toBeDefined()

        view.unmount()
    })

    test('should render guest nav links', () => {
        
        vi.mocked(useStore).mockReturnValue({
            auth : { isAuth : false, user : null },
        })

        const view = render( 
            <MemoryRouter>
                <Nav navLinks={navLinksMock} /> 
            </MemoryRouter> 
        )

        expect( screen.queryByText(/Link1/) ).toBeNull()
        expect( screen.queryByText(/Link2/) ).toBeNull()
        expect( screen.queryByText(/Link3/) ).toBeDefined()
        expect( screen.queryByText(/Link4/) ).toBeDefined()
        expect( screen.getByText(/Link5/) ).toBeDefined()
        expect( screen.getByText(/Link6/) ).toBeDefined()

        view.unmount()
    })

})