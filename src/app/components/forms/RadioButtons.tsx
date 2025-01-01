import { useState } from 'react'

type Props = {
  buttons: {
    label: string
  }[]
  defaultSelectedIndex?: number
}

export const RadioButtons = ({ buttons, defaultSelectedIndex = 0 }: Props) => {
  const [selectedIndex, setSelectedIndex] =
    useState<number>(defaultSelectedIndex)
  return (
    <div className="flex items-center">
      {buttons.map((button, index) => (
        <button
          className={`min-w-16 px-2 py-1 first-of-type:rounded-l-lg last-of-type:rounded-r-lg text-sm ${selectedIndex === index ? 'bg-accent text-white' : 'bg-slate-200'}`}
          key={index}
          onClick={() => setSelectedIndex(index)}
        >
          {button.label}
        </button>
      ))}
    </div>
  )
}
