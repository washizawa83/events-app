'use client'

import { Calendar } from './features/calendars/Calendar'

export default function Home() {
  return (
    <div>
      <Calendar handleSelectedDay={() => {}} />
    </div>
  )
}
