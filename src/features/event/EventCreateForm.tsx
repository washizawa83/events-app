'use client'

import { Button } from '@/components/forms/Button'
import { CounterTextArea } from '@/components/forms/CounterTextArea'
import { CounterTextField } from '@/components/forms/CounterTextField'
import { DateForm } from '@/components/forms/DateForm'
import { DateTimeForm } from '@/components/forms/DateTimeForm'
import { FileInputField } from '@/components/forms/FileInputField'
import { LocationForm } from '@/components/forms/LocationForm'
import { RadioButtonGroup } from '@/components/forms/RadioButtonGroup'
import { TagInputField } from '@/components/forms/tag-input-form/TagInputField'
import { createEventAction } from '@/services/calendar/cruds/create'
import { useActionState } from 'react'

const initialState = {
  errorMessage: null,
}

export const EventCreateForm = () => {
  const [state, formAction] = useActionState(createEventAction, initialState)

  return (
    <div className="mx-4 mt-8 md:mx-12">
      <form action={formAction}>
        <div className="mb-4">
          <CounterTextField
            label="イベント名"
            placeholder="イベント名を入力してください"
            maxLength={50}
            name="eventName"
            handleChange={() => {}}
            errorMessage={state.errorMessage?.eventName}
          />
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="イベントの説明"
            placeholder="イベントの説明を入力してください"
            maxLength={1000}
            name="eventDescription"
            handleChange={() => {}}
            errorMessage={state.errorMessage?.eventDescription}
            rows={15}
          />
        </div>
        <div className="mb-4">
          <FileInputField />
        </div>
        <div className="mb-4">
          <TagInputField />
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <DateForm
            label="開始日付"
            name="startDate"
            errorMessage={state.errorMessage?.startDate}
          />
          <DateTimeForm
            label="開始時間"
            name="startDateTime"
            errorMessage={state.errorMessage?.startDateTime}
          />
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <DateForm
            label="終了日付"
            name="endDate"
            errorMessage={state.errorMessage?.endDate}
          />
          <DateTimeForm
            label="終了時間"
            name="endDateTime"
            errorMessage={state.errorMessage?.endDateTime}
          />
        </div>
        <div className="mb-4">
          <RadioButtonGroup
            label="イベントの種類"
            name="eventType"
            items={[
              { label: 'オフライン', value: 'OFFLINE' },
              { label: 'オンライン', value: 'ONLINE' },
              { label: 'ハイブリッド', value: 'HYBRID' },
            ]}
            errorMessage={state.errorMessage?.eventType}
          />
        </div>
        <div className="mb-4">
          <LocationForm
            label="開催地（オフライン）"
            errorMessage={{
              prefecture: state.errorMessage?.prefecture,
              city: state.errorMessage?.city,
            }}
          />
          <CounterTextField
            label="開催地 詳細"
            placeholder="〇〇区〇〇町"
            maxLength={100}
            name="locationDetail"
            handleChange={() => {}}
            errorMessage={state.errorMessage?.locationDetail}
          />
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="開催地（オンライン）"
            placeholder="zoom開催 URL：https://..."
            maxLength={250}
            handleChange={() => {}}
            name="onlineLocationDetail"
            errorMessage={state.errorMessage?.onlineLocationDetail}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="参加条件（任意）"
            placeholder="参加条件を入力してください"
            maxLength={250}
            handleChange={() => {}}
            name="eventConditions"
            errorMessage={state.errorMessage?.eventConditions}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="参加人数（任意）"
            placeholder="参加人数を入力してください"
            maxLength={250}
            handleChange={() => {}}
            name="maxCapacity"
            errorMessage={state.errorMessage?.maxCapacity}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="その他・概要（任意）"
            placeholder="その他・概要を入力してください"
            maxLength={250}
            handleChange={() => {}}
            name="overview"
            errorMessage={state.errorMessage?.overview}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="お問い合わせ（任意）"
            placeholder="お問い合わせを入力してください"
            maxLength={250}
            handleChange={() => {}}
            name="contact"
            errorMessage={state.errorMessage?.contact}
            rows={3}
          />
        </div>
        <Button label="作成" type="submit" handleClick={() => {}} />
      </form>
    </div>
  )
}
