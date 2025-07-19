'use client'

import { CounterTextArea } from '@/components/forms/CounterTextArea'
import { CounterTextField } from '@/components/forms/CounterTextField'
import { DateForm } from '@/components/forms/DateForm'
import { DateTimeForm } from '@/components/forms/DateTimeForm'
import { LocationForm } from '@/components/forms/LocationForm'
import { RadioButtonGroup } from '@/components/forms/RadioButtonGroup'

export const EventCreateForm = () => {
  return (
    <div className="mx-4 mt-8 md:mx-12">
      <form action="">
        <div className="mb-4">
          <CounterTextField
            label="イベント名"
            placeholder="イベント名を入力してください"
            maxLength={50}
            handleChange={() => {}}
          />
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="イベントの説明"
            placeholder="イベントの説明を入力してください"
            maxLength={1000}
            handleChange={() => {}}
            rows={15}
          />
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <DateForm label="開始日付" />
          <DateTimeForm label="開始時間" />
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <DateForm label="終了日付" />
          <DateTimeForm label="終了時間" />
        </div>
        <div className="mb-4">
          <RadioButtonGroup
            label="イベントの種類"
            name="eventType"
            items={[
              { label: 'オフライン', value: 'offline' },
              { label: 'オンライン', value: 'online' },
              { label: 'ハイブリッド', value: 'hybrid' },
            ]}
          />
        </div>
        <div className="mb-4">
          <LocationForm label="開催地（オフライン）" />
          <CounterTextField
            label="開催地 詳細"
            placeholder="〇〇区〇〇町"
            maxLength={50}
            handleChange={() => {}}
          />
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="開催地（オンライン）"
            placeholder="zoom開催 URL：https://..."
            maxLength={250}
            handleChange={() => {}}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="参加条件（任意）"
            placeholder="参加条件を入力してください"
            maxLength={250}
            handleChange={() => {}}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="参加人数（任意）"
            placeholder="参加人数を入力してください"
            maxLength={250}
            handleChange={() => {}}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="その他・概要（任意）"
            placeholder="その他・概要を入力してください"
            maxLength={250}
            handleChange={() => {}}
            rows={3}
          />
        </div>
        <div className="mb-4">
          <CounterTextArea
            label="お問い合わせ（任意）"
            placeholder="お問い合わせを入力してください"
            maxLength={250}
            handleChange={() => {}}
            rows={3}
          />
        </div>
      </form>
    </div>
  )
}
