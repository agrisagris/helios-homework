export interface RawDataType {
  commodity: string
  date_on: string
  wapr: number
  last: number | null
  season_status: string
}

export interface ProcessedDataType {
  date_on: string
  risk: number
  avg_price: number | null
  price_range: (number | null)[]
  month: string
}

export interface CustomXTickProps {
  x?: number
  y?: number
  payload?: {
    value: string
  }
}
