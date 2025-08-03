'use client'

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

type SelectBoxOption = {
  [key: string]: string
}

type Props = {
  label?: string
  placeholder?: string
  options: SelectBoxOption[]
  optionLabelName: string
  optionValueName: string
  name: string
  errorMessage?: string[]
  disabled?: boolean
  handleSelect?: (option: SelectBoxOption) => void
  resetKey?: string
}

export const SelectBox = ({
  label,
  placeholder,
  options,
  optionLabelName,
  optionValueName,
  name,
  errorMessage,
  disabled = false,
  handleSelect,
  resetKey,
}: Props) => {
  const [selected, setSelected] = useState<SelectBoxOption | null>(null)

  // resetKeyが変更されたときに選択をリセット
  useEffect(() => {
    setSelected(null)
  }, [resetKey])

  const handleChange = (option: SelectBoxOption) => {
    setSelected(option)
    handleSelect?.(option)
  }

  return (
    <Listbox
      value={selected}
      onChange={handleChange}
      name={name}
      disabled={disabled}
    >
      <div className="relative w-full">
        <Label className="text-sm text-gray-900">{label}</Label>
        <ListboxButton
          className={`grid h-8 w-full cursor-default grid-cols-1 rounded-lg py-1.5 pl-3 pr-2 text-left text-gray-900 sm:text-sm/6 ${
            disabled ? 'bg-disabled' : 'bg-white'
          }`}
        >
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">
              {selected?.[optionLabelName] || placeholder}
            </span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option[optionValueName]}
              value={option}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-gray-300 data-[focus]:outline-none"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {option[optionLabelName]}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-accent group-[&:not([data-selected])]:hidden">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
      <div className="text-sm text-red-500">{errorMessage}</div>
    </Listbox>
  )
}
