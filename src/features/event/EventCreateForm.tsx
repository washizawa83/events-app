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
import {
  createEventAction,
  CreateEventActionState,
} from '@/services/event/event.actions'
import { City, Prefecture } from '@prisma/client'
import { useActionState, useEffect, useState } from 'react'

const initialState: CreateEventActionState = {
  errorMessage: null,
}

type Props = {
  prefectures: Prefecture[]
  cities: City[]
}

export const EventCreateForm = ({ prefectures, cities }: Props) => {
  const [selectedEventType, setSelectedEventType] = useState<string | null>(
    null,
  )
  const [state, formAction] = useActionState(createEventAction, initialState)

  // エラー発生時に最初のエラー項目までスクロール
  useEffect(() => {
    if (state.errorMessage) {
      const errorFields = Object.keys(state.errorMessage).filter(
        (key) =>
          key !== 'general' &&
          state.errorMessage?.[key as keyof typeof state.errorMessage],
      )

      if (errorFields.length > 0) {
        const firstErrorField = errorFields[0]
        const element = document.querySelector(`[name="${firstErrorField}"]`)

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
          // フォーカスも当てる
          ;(element as HTMLElement).focus()
        }
      }
    }
  }, [state.errorMessage])

  const handleSelectEventType = (eventType: string) => {
    setSelectedEventType(eventType)
  }

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (
      e.key === 'Enter' &&
      (e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLAnchorElement)
    ) {
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <div className="mx-4 mt-8 md:mx-12">
      <form action={formAction} onKeyDown={checkKeyDown}>
        <div className="mb-4 pb-4">
          <div className="mb-4">
            <CounterTextField
              label="イベント名"
              placeholder="イベント名を入力してください"
              maxLength={50}
              name="title"
              handleChange={() => {}}
              errorMessage={state.errorMessage?.title}
              defaultValue={state.prevFormData?.get('title') as string}
            />
          </div>
          <div className="mb-4">
            <CounterTextArea
              label="イベントの説明"
              placeholder="イベントの説明を入力してください"
              maxLength={1000}
              rows={15}
              name="description"
              handleChange={() => {}}
              errorMessage={state.errorMessage?.description}
              defaultValue={state.prevFormData?.get('description') as string}
            />
          </div>
          <div className="mb-4">
            <TagInputField errorMessage={state.errorMessage?.tags} />
          </div>
          <div className="mb-4">
            <FileInputField />
          </div>
        </div>
        <div className="mb-4 pb-4">
          <div className="mb-4 flex flex-wrap items-baseline gap-4">
            <DateForm
              label="開始日付"
              name="startDate"
              errorMessage={state.errorMessage?.startDate}
              defaultValue={state.prevFormData?.get('startDate') as string}
            />
            <DateTimeForm
              label="開始時間"
              name="startDateTime"
              errorMessage={state.errorMessage?.startDateTime}
              defaultValue={state.prevFormData?.get('startDateTime') as string}
            />
          </div>
          <div className="mb-4 flex flex-wrap items-baseline gap-4">
            <DateForm
              label="終了日付"
              name="endDate"
              errorMessage={state.errorMessage?.endDate}
              defaultValue={state.prevFormData?.get('endDate') as string}
            />
            <DateTimeForm
              label="終了時間"
              name="endDateTime"
              errorMessage={state.errorMessage?.endDateTime}
              defaultValue={state.prevFormData?.get('endDateTime') as string}
            />
          </div>
        </div>
        <div className="mb-4 pb-4">
          <RadioButtonGroup
            label="イベントの種類"
            name="eventType"
            items={[
              { label: 'オフライン', value: 'OFFLINE' },
              { label: 'オンライン', value: 'ONLINE' },
              { label: 'ハイブリッド', value: 'HYBRID' },
            ]}
            errorMessage={state.errorMessage?.eventType}
            handleChange={handleSelectEventType}
            defaultChecked={state.prevFormData?.get('eventType') as string}
          />
        </div>
        <div className="mb-4 pb-4">
          <div className="mb-4">
            <LocationForm
              label="開催地（オフライン）"
              disabled={selectedEventType === 'ONLINE'}
              prefectures={prefectures}
              cities={cities}
            />
            <CounterTextField
              label="開催地 詳細"
              placeholder="〇〇区〇〇町"
              maxLength={100}
              name="locationDetail"
              handleChange={() => {}}
              errorMessage={state.errorMessage?.locationDetail}
              defaultValue={state.prevFormData?.get('locationDetail') as string}
              disabled={selectedEventType === 'ONLINE'}
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
              defaultValue={
                state.prevFormData?.get('onlineLocationDetail') as string
              }
              rows={3}
              disabled={selectedEventType === 'OFFLINE'}
            />
          </div>
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="参加条件（任意）"
            placeholder="参加条件を入力してください"
            maxLength={250}
            handleChange={() => {}}
            name="eventConditions"
            errorMessage={state.errorMessage?.eventConditions}
            defaultValue={state.prevFormData?.get('eventConditions') as string}
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
            defaultValue={state.prevFormData?.get('maxCapacity') as string}
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
            defaultValue={state.prevFormData?.get('overview') as string}
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
            defaultValue={state.prevFormData?.get('contact') as string}
          />
        </div>
        {state.errorMessage?.general && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">
              {state.errorMessage.general[0]}
            </div>
          </div>
        )}
        <div className="my-8 flex justify-end">
          <Button label="入力内容の確認" type="submit" handleClick={() => {}} />
        </div>
      </form>
    </div>
  )
}
