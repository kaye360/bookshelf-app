// @vitest-environment jsdom
import { render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import LogoutModal from "./LogoutModal"
import userEvent from "@testing-library/user-event"


const useNavigateMock = vi.hoisted( () => vi.fn() )
vi.mock('react-router-dom', () => ({
    useNavigate : () => useNavigateMock
}))


const useLogoutMock = vi.hoisted( () => vi.fn() )
vi.mock('../../app/auth/api/useLogout', () => {
    return {
        default : () => useLogoutMock
    }
})

const closeModalFn = vi.fn()

describe('LogoutModal', () => {

    
    test('should render LogoutModal', () => {
        const view = render( <LogoutModal closeModalFn={closeModalFn} /> )
        expect( screen.getByText('Log out') ).toBeInstanceOf(HTMLButtonElement)
        expect( screen.getByText('Cancel') ).toBeInstanceOf(HTMLButtonElement)
        view.unmount()
    })
    
    test('should log user out', async () => {
        const view = render( <LogoutModal closeModalFn={closeModalFn} /> )
        await userEvent.click( screen.getByText('Log out') )
        expect(useNavigateMock).toHaveBeenCalledOnce()
        expect(useLogoutMock).toHaveBeenCalledOnce()
        view.unmount()
    })

    test('should close modal', async () => {
        const view = render( <LogoutModal closeModalFn={closeModalFn} /> )
        await userEvent.click( screen.getByText('Cancel') )
        expect(closeModalFn).toHaveBeenCalledOnce()
        view.unmount()
    })

})