import { render } from "@testing-library/react";
import type { Theme } from "@/types";
import { themeList } from '@/resources/themesList';
import { ThemeProvider } from "styled-components";
import { StyledButton } from "@/components";


describe('StyledButton', () => {
    const renderComponent = (theme:Theme , className?: string, props = {})=>
        render (
            <ThemeProvider theme={theme}>
                <StyledButton className={className} {...props}/>
            </ThemeProvider>
        )

        themeList.forEach(({name, theme}) => {
            describe(`${name}`,() => {
                it('should match the snapshot with alert class', () => {
                    const { asFragment } = renderComponent(theme, 'alert')
                    expect(asFragment()).toMatchSnapshot()
                })

                it('should match the snapshot with primary class', () => {
                    const { asFragment } = renderComponent(theme, 'primary')
                    expect(asFragment()).toMatchSnapshot()
                })

                it('should match the snapshot with borderless-alert class', () => {
                    const { asFragment } = renderComponent(theme, 'borderless-alert')
                    expect(asFragment()).toMatchSnapshot()
                })

                it('should match the snapshot with disabled status', () => {
                    const { asFragment } = renderComponent(theme, 'primary', {disabled: true})
                    expect(asFragment()).toMatchSnapshot()
                })
            })
        })
})