import { InputHTMLAttributes } from 'react'

interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

const DateInput = ({ label, name }: DateInputProps) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type='date' id={name} />
    </>
  )
}

export default DateInput
