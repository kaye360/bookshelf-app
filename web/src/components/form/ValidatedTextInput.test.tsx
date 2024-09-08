// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import ValidatedTextInput from "./ValidatedTextInput";
import { FormState } from "react-hook-form";
import { RegisterPayload } from "../../types/types";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";

const formStateMock : {[key : string] : object} = {
    errors : {
        password : '',
        username : { message : 'Invalid username' }
    },
    dirtyFields : {
        password : '',
        username : ''
    }
}

describe('ValidatedTextInput', () => {

    const name  = 'username'
    const label = 'Username'
    const formStateData = [ formStateMock, 'username' ] as unknown as [FormState<RegisterPayload>, keyof RegisterPayload]

    const view = render(
        <ValidatedTextInput 
            name={name}
            formStateData={formStateData}
        />
    )

    const getInput = () => screen.getByRole('textbox') as HTMLInputElement
    const getWrapper = () => view.container.firstElementChild as HTMLDivElement

    test('should have proper input name', () => {
        expect( getInput().name ).toBe( name )
    })

    test('should have errors', () => {
        expect( screen.getByText('Invalid username') ).toBeDefined()
        expect( getWrapper().dataset.testinghaserrors ).toBe("true")
    })

    test('should be touched', () => {
        expect( getWrapper().dataset.testingistouched ).toBe("true")
    })

    test('should be not touched', () => {
        formStateMock.dirtyFields = { password : ''}
        view.rerender( <ValidatedTextInput name={name} formStateData={formStateData} /> )
        expect( getWrapper().dataset.testingistouched ).toBe("false")
    })

    test('should have no errors', () => {
        formStateMock.errors = { password : ''}
        view.rerender( <ValidatedTextInput name={name} formStateData={formStateData} /> )
        expect( getWrapper().dataset.testinghaserrors ).toBe("false")
    })
    
    test('should show label text', () => {})
        view.rerender( <ValidatedTextInput name={name} label={label} formStateData={formStateData} /> )
        expect( screen.getByText(label) ).toBeDefined()

})