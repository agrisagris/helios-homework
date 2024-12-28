import { ProcessedDataType, RawDataType } from '@/data/types'
import dayjs, { Dayjs } from 'dayjs'

export const findDateRange = (data: RawDataType[]): { minDate: Dayjs; maxDate: Dayjs } => {
  const minDate = dayjs(
    data.reduce((min, current) => (dayjs(current.date_on).isBefore(dayjs(min.date_on)) ? current : min)).date_on
  )

  const maxDate = dayjs(
    data.reduce((max, current) => (dayjs(current.date_on).isAfter(dayjs(max.date_on)) ? current : max)).date_on
  )

  return { minDate, maxDate }
}

export const filterByDateRange = (data: RawDataType[], minDate: Dayjs, maxDate: Dayjs): RawDataType[] =>
  data.filter((item) => {
    const itemDate = dayjs(item.date_on)
    return (
      (itemDate.isAfter(minDate, 'month') || itemDate.isSame(minDate, 'month')) &&
      (itemDate.isBefore(maxDate, 'month') || itemDate.isSame(maxDate, 'month'))
    )
  })

export const processRawData = (inputData: RawDataType[]): ProcessedDataType[] => {
  const groupedByDate: Record<string, { risk: number; prices: number[] }> = {}

  inputData.forEach((item) => {
    const { date_on, wapr, last } = item

    if (!groupedByDate[date_on]) {
      groupedByDate[date_on] = { risk: wapr, prices: [] }
    }

    if (last !== null) {
      groupedByDate[date_on].prices.push(last)
    }
  })

  return Object.entries(groupedByDate).map(([date_on, { risk, prices }]) => {
    const avg_price = prices.length ? Math.round(prices.reduce((sum, price) => sum + price, 0) / prices.length) : null
    const min_price = prices.length ? Math.min(...prices) : null
    const max_price = prices.length ? Math.max(...prices) : null
    const month = dayjs(date_on).format('MMM')

    return {
      date_on,
      risk,
      avg_price,
      price_range: [min_price, max_price],
      month,
    }
  })
}
