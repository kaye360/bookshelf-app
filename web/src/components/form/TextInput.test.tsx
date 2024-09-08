// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TextInput from "./TextInput";

describe('TextInput', () => {

    const label    = 'Username'
    const name     = 'username'
    const register = vi.fn()

    const view       = render( <TextInput label={label} name={name} register={ register } /> )
    const getWrapper = () => view.container.firstElementChild as HTMLLabelElement | HTMLDivElement
    const getInput   = () => screen.getByRole('textbox') as HTMLInputElement

    test('should display heading text', () => {
        expect( screen.getByRole('heading').textContent ).toBe(label)
    })

    test('should have proper input name', () => {
        expect( getInput().name ).toBe(name)
    })
    
    test('should render label html element', () => {
        expect( getWrapper().dataset.testingelement ).toBe('label')
    })

    test('should render div html element', () => {
        view.rerender( <TextInput name={name} /> )
        expect( getWrapper().dataset.testingelement ).toBe('div')
    })
    
    test('should call register function', () => {
        expect( register ).toBeCalled()
    })
   
    
})