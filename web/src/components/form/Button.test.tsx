// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Button from "./Button";

describe('Button', () => {

    test('should be fill variant (default)', () => {
        const view = render(
            <Button>Click Me</Button>
        )
        expect( screen.getByRole('button').dataset.testingvariant ).toBe('fill')
        view.unmount()
    })

    test('should be fill variant (variant="fill")', () => {
        const view = render(
            <Button variant="fill">Click Me</Button>
        )
        expect( screen.getByRole('button').dataset.testingvariant ).toBe('fill')
        view.unmount()
    })

    test('should be ghost variant (variant="ghost")', () => {
        const view = render(
            <Button variant="ghost">Click Me</Button>
        )
        expect( screen.getByRole('button').dataset.testingvariant ).toBe('ghost')
        view.unmount()
    })

    test('should be outline variant (variant="outline")', () => {
        const view = render(
            <Button variant="outline">Click Me</Button>
        )
        expect( screen.getByRole('button').dataset.testingvariant ).toBe('outline')
        view.unmount()
    })

    test('should have onclick function', () => {
        const view = render(
            <Button onClick={() => {}}>Click Me</Button>
        )
        expect( screen.getByRole('button').onclick ).toBeTypeOf('function')
        view.unmount()
    })

    test('should be disabled', () => {
        const view = render(
            <Button disabled onClick={() => {}}>Click Me</Button>
        )
        expect( screen.getByRole('button').onclick ).toBeNull()
        view.unmount()
    })
})