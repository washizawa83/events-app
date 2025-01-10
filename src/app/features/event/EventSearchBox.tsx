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
    <div className="bg-primary py-4">
      <div className="mx-auto w-11/12">
        <div className="mb-5 flex items-center justify-between">
          <div className="mr-10 flex-grow">
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
            color="variant"
            handleClick={() => setIsOpenRefineForm(!isOpenRefineForm)}
          />
        </div>
        <div
          className={`flex-col flex-wrap items-center justify-between sm:flex lg:flex-row ${isOpenRefineForm ? 'flex' : 'hidden'}`}
        >
          <div className="mb-5 w-full items-center sm:flex lg:w-[48%]">
            <div className="mb-5 mr-5 sm:mb-0">
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
          <div className="mb-5 w-full items-center sm:flex lg:w-[48%] lg:justify-end">
            <div className="mb-5 mr-5 sm:mb-0">
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
