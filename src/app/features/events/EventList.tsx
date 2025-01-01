import { RadioButtons } from '@/app/components/forms/RadioButtons'
import { SelectBox } from '@/app/components/forms/SelectBox'
import { useScrollable } from '@/app/hooks/useScrollable'
import { eventLocations, eventSchedule } from '@/app/utils/events/event-utls'
import { useRef } from 'react'
import { IconContext } from 'react-icons'
import { GrLocation } from 'react-icons/gr'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdOutlineDateRange } from 'react-icons/md'

type Props = {
  events: {
    title: string
    description: string
    location: string
    schedule: string
  }[]
}

export const EventList = ({ events }: Props) => {
  const scrollableElem = useRef<HTMLUListElement>(null)
  const { top, bottom } = useScrollable(scrollableElem)

  return (
    <div className="p-2 md:mr-5">
      <div className="p-2 border-b">
        <RadioButtons buttons={[{ label: 'Off-Line' }, { label: 'On-Line' }]} />
        <div>
          <div className="flex items-center w-full">
            <div className="w-1/2 mr-2">
              <SelectBox label={'Location'} options={eventLocations} />
            </div>
            <div className="w-1/2">
              <SelectBox label={'Schedule'} options={eventSchedule} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-8">
        {top && (
          <IconContext.Provider value={{ size: '28px', color: '#f472b6' }}>
            <IoIosArrowUp />
          </IconContext.Provider>
        )}
      </div>
      <ul className="h-[500px] overflow-y-scroll" ref={scrollableElem}>
        {events.map((event, index) => (
          <li className="mb-3 p-2 border-b" key={index}>
            <h3 className="text-lg mb-1">{event.title}</h3>
            <p className="mb-1 text-gray-700">{event.description}</p>
            <div className="flex items-center">
              <span className="mr-3">
                <IconContext.Provider value={{ color: '#f472b6' }}>
                  <GrLocation />
                </IconContext.Provider>
              </span>
              <p>{event.location}</p>
            </div>
            <div className="flex items-center">
              <span className="mr-3">
                <IconContext.Provider value={{ color: '#f472b6' }}>
                  <MdOutlineDateRange />
                </IconContext.Provider>
              </span>
              <p>{event.schedule}</p>
            </div>
          </li>
        ))}
        <div className="text-center">
          <button className="bg-accent rounded-2xl px-3 py-1">
            <p className="text-white text-sm">View More</p>
          </button>
        </div>
      </ul>
      <div className="flex items-center justify-center h-8">
        {bottom && (
          <IconContext.Provider value={{ size: '28px', color: '#f472b6' }}>
            <IoIosArrowDown />
          </IconContext.Provider>
        )}
      </div>
    </div>
  )
}
