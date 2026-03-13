import "@testing-library/jest-dom"
import 'jest-styled-components'
import { pxToRem } from "@/utils"
import { render } from "@testing-library/react";
import type { Theme } from "@/types";
import { themeList } from '@/resources/themesList';
import { ThemeProvider } from "styled-components";
import { Logo } from "@/components";


describe('pxToRem', () => {
    const renderComponent = (theme:Theme , width?: number, height?:number)=>
        render (
            <ThemeProvider theme={theme}>
                <Logo height={height ?? 32} width={width??32}/>
            </ThemeProvider>
        )

        themeList.forEach(({name, theme}) => {
            describe(`${name}`,() => {
                it('should apply the correct background image', ()=>{
                    const { container } = renderComponent(theme, 40, 40 )
                    expect(container.firstChild).toHaveStyleRule(
                        'background-image',
                        `url(/${theme.appLogo})`
                    )
                })

                it('should apply the correct height and width', ()=>{
                    const { container } = renderComponent(theme, 40, 40 )
                    expect(container.firstChild).toHaveStyleRule(
                        'height',
                        pxToRem(40)
                    )
                    expect(container.firstChild).toHaveStyleRule(
                        'width',
                        pxToRem(40)
                    )
                })
            })
        })
})