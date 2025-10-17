export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export type MessageProps = {
  msg: string
  type: "error" | "success"
}

export interface FormComponentsProps {
  inputs: InputProps[]
  buttons: ButtonProps[]
  message?: MessageProps
}
