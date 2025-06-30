import type { components } from '@/types/api'
import { atom } from 'jotai'

export const loginUserAtom = atom<components['schemas']['UserProfile'] | null>(
  null,
)
