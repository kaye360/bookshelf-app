// @vitest-environment jsdom
import { describe, expect, test, vi } from "vitest"
import { screen } from "@testing-library/dom"
import { render } from "@testing-library/react"
import Footer from "./Footer"
import { useStore } from "../../store/store"

vi.mock('../../store/store')

const router = await import('react-router-dom')
// @ts-expect-error
router.Link = vi.fn( ({to, children}) => <a href={to}>{children}</a>)

describe('Footer', () => {

    test('should render isAuth Footer', () => {
        vi.mocked(useStore).mockReturnValue({
            auth : { isAuth : true }
        })
        const view = render( <Footer /> )
        expect( screen.getByText('Dashboard') ).toBeDefined()
        view.unmount()
    })

    test('should render !isAuth Footer', () => {
        vi.mocked(useStore).mockReturnValue({
            auth : { isAuth : false }
        })
        const view = render( <Footer /> )
        expect( screen.getByText('Log In') ).toBeDefined()
        view.unmount()
    })

})