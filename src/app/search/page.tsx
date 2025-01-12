import { BasePageLayout } from '@/components/layouts/BasePageLayout'
import { EventList } from '@/features/event/EventList'
import { EventSearchBox } from '@/features/event/EventSearchBox'

const mockEvents = [
  {
    title: '東京マルシェフェス',
    description: '新鮮な野菜や特産品が揃う人気のマルシェです。',
    address: '東京都千代田区丸の内1-1',
    schedule: '10:00 ~ 15:00',
    tags: ['グルメ', '食べ歩き'],
  },
  {
    title: '秋田県ふれあいデー',
    description: '秋田県と触れ合える特別なイベントです。',
    address: '秋田県大館市比内町123',
    schedule: '09:00 ~ 14:00',
    tags: ['動物', 'ふれあい'],
  },
  {
    title: '京都紅葉ライトアップ',
    description: '京都の紅葉を楽しむライトアップイベントです。',
    address: '京都府京都市左京区123',
    schedule: '18:00 ~ 22:00',
    tags: ['紅葉', 'ライトアップ'],
  },
  {
    title: '福岡グルメフェスティバル',
    description: '福岡の人気グルメを堪能できるイベントです。',
    address: '福岡県福岡市博多区天神1-2-3',
    schedule: '11:00 ~ 17:00',
    tags: ['紅葉', 'ライトアップ'],
  },
  {
    title: 'YouTuber 配信杯',
    description: '人気YouTuberが一堂に集い配信を行います。',
    address: 'オンライン',
    schedule: '11:00 ~ 17:00',
    tags: ['配信', 'オンライン', 'YouTube', '配信者'],
  },
]

const SearchPage = () => {
  return (
    <BasePageLayout>
      <div className="flex h-[calc(100vh-56px)] flex-col">
        <EventSearchBox />
        <EventList events={mockEvents} />
      </div>
    </BasePageLayout>
  )
}

export default SearchPage
