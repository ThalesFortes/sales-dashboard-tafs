import styled from "styled-components"
import { pxToRem } from "@/utils"
import type { FormComponentsProps } from "@/types"
import { StyledButton, StyledInput } from "@/components"

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${pxToRem(16)};
`

function FormComponent(props: FormComponentsProps) {
  const { inputs, buttons, message } = props
  return (
    <StyledForm>
      {inputs.map((inputsProps, index) => (
        <StyledInput key={index} {...inputsProps} />
      ))}
      {buttons.map((buttonsProps, index) => (
        <StyledButton key={index} {...buttonsProps} />
      ))}
      {message && (
        <div style={{ color: message.type === "error" ? "red" : "green" }}>
          {message.msg}
        </div>
      )}
    </StyledForm>
  )
}

export default FormComponent
