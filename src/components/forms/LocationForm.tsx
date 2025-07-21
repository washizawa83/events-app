import { City, Prefecture } from '@prisma/client'
import { useState } from 'react'
import { SelectBox } from './SelectBox'

type Props = {
  label: string
  disabled?: boolean
  prefectures: Prefecture[]
  cities: City[]
  defaultPrefecture?: string
  defaultCity?: string
}

export const LocationForm = ({
  label,
  disabled = false,
  prefectures,
  cities,
}: Props) => {
  const [selectedPrefecture, setSelectedPrefecture] = useState<{
    [key: string]: string
  } | null>(null)
  const [selectedCity, setSelectedCity] = useState<{
    [key: string]: string
  } | null>(null)
  const [filteredCities, setFilteredCities] = useState<City[]>([])

  const handleSelectPrefecture = (option: { [key: string]: string }) => {
    setSelectedPrefecture(option)
    setSelectedCity(null) // 都道府県変更時に市区町村をリセット
    setFilteredCities(cities.filter((city) => city.prefectureId === option.id))
  }

  const handleSelectCity = (option: { [key: string]: string }) => {
    setSelectedCity(option)
  }

  return (
    <div className="flex w-full flex-col flex-wrap">
      <label className="text-sm" htmlFor={label}>
        {label}
      </label>
      <div className="flex items-center">
        <div className="mr-2 w-1/2">
          <SelectBox
            placeholder="都道府県を選択してください"
            options={prefectures}
            name="prefecture"
            disabled={disabled}
            optionLabelName="name"
            optionValueName="id"
            handleSelect={handleSelectPrefecture}
          />
        </div>
        <div className="w-1/2">
          <SelectBox
            placeholder="市区町村を選択してください"
            options={filteredCities}
            name="city"
            disabled={disabled || !selectedPrefecture}
            optionLabelName="name"
            optionValueName="id"
            handleSelect={handleSelectCity}
            resetKey={selectedPrefecture?.id}
          />
        </div>
      </div>
    </div>
  )
}
