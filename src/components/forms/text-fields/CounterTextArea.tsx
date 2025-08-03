'use client'

import { useState } from 'react'

type Props = {
  label: string
  placeholder: string
  maxLength: number
  rows: number
  name: string
  defaultValue?: string
  errorMessage?: string[]
  handleChange: () => void
  disabled?: boolean
}

export const CounterTextArea = ({
  label,
  placeholder,
  maxLength,
  rows,
  name,
  defaultValue,
  errorMessage,
  handleChange,
  disabled = false,
}: Props) => {
  const [textCounter, setTextCounter] = useState(0)
  const [isExcess, setIsExcess] = useState(false)

  const changeInput = (text: string) => {
    setTextCounter(text.length)
    setIsExcess(text.length > maxLength)
    handleChange()
  }

  return (
    <div className="flex w-full flex-col">
      <label className="text-sm text-gray-300">{label}</label>
      <div
        className={`overflow-hidden rounded-md ${isExcess ? 'border-2 border-red-500' : 'focus-within:outline focus-within:outline-2 focus-within:outline-accent'} ${disabled ? 'bg-disabled' : 'bg-white'} `}
      >
        <textarea
          className={`h-full w-full px-2 text-gray-700 outline-none ${
            disabled ? 'bg-disabled' : 'bg-white'
          }`}
          placeholder={placeholder}
          onChange={(e) => changeInput(e.target.value)}
          rows={rows}
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
        ></textarea>
      </div>
      <div
        className={`flex items-baseline justify-between text-sm ${isExcess ? 'text-red-500' : 'text-gray-300'}`}
      >
        <div className="text-red-500">{errorMessage}</div>
        <div className="flex items-center gap-1">
          <span>{textCounter}</span>
          <span>/</span>
          <span>{maxLength}</span>
        </div>
      </div>
    </div>
  )
}
