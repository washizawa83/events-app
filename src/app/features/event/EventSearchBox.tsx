'use client'

import { DateForm } from '../../components/forms/DateForm'
import { DateTimeForm } from '../../components/forms/DateTimeForm'
import { LocationForm } from '../../components/forms/LocationForm'
import { PrimaryButton } from '../../components/forms/PrimaryButton'
import { SelectButtons } from '../../components/forms/SelectButtons'
import { TextForm } from '../../components/forms/TextForm'

const eventTypes = ['オフライン', 'オンライン']

export const EventSearchBox = () => {
  return (
    <div className="py-4 bg-primary">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex-grow mr-10">
            <TextForm label="キーワード" />
          </div>
          <div className="mt-5">
            <PrimaryButton label="さがす" size="s" handleClick={() => {}} />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between lg:flex-row flex-col">
          <div className="flex items-center lg:w-[48%] w-full mb-5">
            <div className="mr-5">
              <SelectButtons
                label="イベントタイプ"
                buttonLabels={eventTypes}
                selected={0}
              />
            </div>
            <div className="flex-grow">
              <LocationForm label="場所" />
            </div>
          </div>
          <div className="flex items-center lg:justify-end lg:w-[48%] w-full mb-5">
            <div className="mr-5">
              <DateForm label="日程" />
            </div>
            <div className="flex-grow">
              <DateTimeForm label="日時" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
