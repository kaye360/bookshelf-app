// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Modal from "./Modal";
import userEvent from "@testing-library/user-event";

describe('Modal', () => {

    test('should display modal content', () => {
        const view = render( 
            <Modal closeModalFn={ () => {} }>
                Sample Content
            </Modal>
        )  
        expect( screen.getByText('Sample Content') ).toBeDefined()
        view.unmount()
    })

    test('should call close modal function (close button click)', async () => {
        const closeModalFn = vi.fn()
        const view = render( 
            <Modal closeModalFn={ closeModalFn }>
                Sample Content
            </Modal>
        )  
        await userEvent.click( screen.getByRole('button') )
        setTimeout( () =>{
            expect( closeModalFn ).toHaveBeenCalledOnce()
        }, 200)
        view.unmount()
    })

    test('should call close modal function (esc key click)', async () => {
        const closeModalFn = vi.fn()
        const view = render( 
            <Modal closeModalFn={ closeModalFn }>
                Sample Content
            </Modal>
        )  
        await userEvent.keyboard('{Escape}')
        setTimeout( () =>{
            expect( closeModalFn ).toHaveBeenCalledOnce()
        }, 200)
        view.unmount()
    })

    test('should call close modal function (modal overlay click)', async () => {
        const closeModalFn = vi.fn()
        const view = render( 
            <Modal closeModalFn={ closeModalFn }>
                Sample Content
            </Modal>
        )  
        await userEvent.click( screen.getByTestId('modal') )
        setTimeout( () =>{
            expect( closeModalFn ).toHaveBeenCalledOnce()
        }, 200)
        view.unmount()
    })
    
})