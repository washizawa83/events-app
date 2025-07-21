import { prisma } from '@/lib/prisma'

export const getPrefectures = async () => {
  const prefectures = await prisma.prefecture.findMany()
  return prefectures
}

export const getPrefectureById = async (prefectureId: string) => {
  const prefecture = await prisma.prefecture.findUnique({
    where: { id: prefectureId },
  })
  return prefecture
}

export const getAreas = async () => {
  const areas = await prisma.area.findMany()
  return areas
}

export const getAreaById = async (areaId: string) => {
  const area = await prisma.area.findUnique({
    where: { id: areaId },
  })
  return area
}
export const getCities = async () => {
  const cities = await prisma.city.findMany()
  return cities
}

export const getCityById = async (cityId: string) => {
  const city = await prisma.city.findUnique({
    where: { id: cityId },
  })
  return city
}

export const getCitiesByPrefecture = async (prefectureId: string) => {
  const cities = await prisma.city.findMany({
    where: {
      prefectureId: prefectureId,
    },
  })
  return cities
}
