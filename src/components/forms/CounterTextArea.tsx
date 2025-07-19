'use client'

import { useState } from 'react'

type Props = {
  label: string
  placeholder: string
  maxLength: number
  rows: number
  handleChange: () => void
}

export const CounterTextArea = ({
  label,
  placeholder,
  maxLength,
  rows,
  handleChange,
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
        className={`overflow-hidden rounded-md bg-white ${isExcess ? 'border-2 border-red-500' : 'focus-within:outline focus-within:outline-2 focus-within:outline-accent'}`}
      >
        <textarea
          className="h-full w-full px-2 text-gray-700 outline-none"
          placeholder={placeholder}
          onChange={(e) => changeInput(e.target.value)}
          rows={rows}
        ></textarea>
      </div>
      <div
        className={`flex items-center justify-end text-sm ${isExcess ? 'text-red-500' : 'text-gray-300'}`}
      >
        <span>{textCounter}</span>
        <span>/</span>
        <span>{maxLength}</span>
      </div>
    </div>
  )
}
