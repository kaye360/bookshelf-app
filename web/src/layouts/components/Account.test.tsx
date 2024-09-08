// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Account from "./Account";
import { useStore } from "../../store/store";
import userEvent from "@testing-library/user-event";


const router = await import('react-router-dom')
// @ts-expect-error
router.Link = vi.fn()

vi.mock('../../store/store')

describe('Account', () => {

    test('should display !isAuth view', async () => {

        vi.mocked(useStore).mockReturnValue({
            auth : { isAuth : false, user : null },
        })

        const view = render( <Account /> )
        expect( router.Link ).toHaveBeenCalledTimes(2)

        view.unmount()
    })
    
    test('should display username and avatar', () => {

        vi.mocked(useStore).mockReturnValue({
            auth : {
                isAuth : true,
                user : {
                    handle : 'userHandle'
                }
            },
        })

        const view = render( <Account /> )
        expect( screen.getByText('userHandle') ).toBeDefined()
        expect( screen.getByText('U') ).toBeDefined()

        view.unmount()
    })

    test('should call handleOutsideClick', () => {

        vi.mocked(useStore).mockReturnValue({
            auth : {
                isAuth : true,
                user : {
                    handle : 'userHandle'
                }
            },
        })

        const view = render( <Account /> )
        userEvent.click( document.body )
        view.debug()
      
    })

})