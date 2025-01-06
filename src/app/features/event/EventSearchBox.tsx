'use client'

import { useState } from 'react'
import { Button } from '../../components/forms/Button'
import { DateForm } from '../../components/forms/DateForm'
import { DateTimeForm } from '../../components/forms/DateTimeForm'
import { LocationForm } from '../../components/forms/LocationForm'
import { SelectButtons } from '../../components/forms/SelectButtons'
import { TextForm } from '../../components/forms/TextForm'

const eventTypes = ['オフライン', 'オンライン']

export const EventSearchBox = () => {
  const [isOpenRefineForm, setIsOpenRefineForm] = useState(false)

  return (
    <div className="py-4 bg-primary">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex-grow mr-10">
            <TextForm label="キーワード" />
          </div>
          <div className="mt-5">
            <Button label="さがす" size="s" handleClick={() => {}} />
          </div>
        </div>
        <div className={`sm:hidden ${isOpenRefineForm && 'mb-5'}`}>
          <Button
            label="絞り込む"
            size="s"
            color="valiant"
            handleClick={() => setIsOpenRefineForm(!isOpenRefineForm)}
          />
        </div>
        <div
          className={`sm:flex flex-wrap items-center justify-between lg:flex-row flex-col ${isOpenRefineForm ? 'flex' : 'hidden'}`}
        >
          <div className="sm:flex items-center lg:w-[48%] w-full mb-5">
            <div className="sm:mb-0 mr-5 mb-5">
              <SelectButtons
                label="イベントタイプ"
                buttonLabels={eventTypes}
                selected={0}
                handleSelected={() => {}}
              />
            </div>
            <div className="flex-grow">
              <LocationForm label="場所" />
            </div>
          </div>
          <div className="sm:flex items-center lg:justify-end lg:w-[48%] w-full mb-5">
            <div className="sm:mb-0 mr-5 mb-5">
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
