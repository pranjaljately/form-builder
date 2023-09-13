import { ButtonHTMLAttributes, ReactNode } from 'react'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The label to be rendered within the button.
   * Note that this prop is capable of taking a ReactNode, meaning SVG icons within buttons are supported.
   */
  label: string | ReactNode
  /**
   * Whether the button is in a disabled state.
   */
  disabled?: boolean
}

const SubmitButton = ({ label, disabled }: SubmitButtonProps) => {
  return (
    <button type='submit' disabled={disabled}>
      {label}
    </button>
  )
}

export default SubmitButton
