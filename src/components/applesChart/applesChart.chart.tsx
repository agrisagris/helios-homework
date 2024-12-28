'use client'
import {
  CustomLeftYAsisTick,
  CustomRightYAsisTick,
  CustomXAsisTick,
  EmptyMessage,
  StyledAxisLabel,
} from '@/components/applesChart/appleChart.styles'
import CustomTooltip from '@/components/applesChart/customTooltip'
import { ProcessedDataType } from '@/data/types'
import { DotChartOutlined } from '@ant-design/icons'
import { Form, Skeleton } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export const ApplesChartChart: React.FC<{ data: ProcessedDataType[] }> = ({ data }) => {
  const showClimateRisk = Form.useWatch('showClimateRisk')
  const showPriceRange = Form.useWatch('showPriceRanges')

  if (data.length === 0) {
    return (
      <EmptyMessage>
        <span>No data available for the chosen dates. Try adjusting your selection.</span>
        <Skeleton.Node>
          <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
        </Skeleton.Node>
      </EmptyMessage>
    )
  }

  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <ComposedChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 12,
          bottom: 25,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="date_on" hide={true} />
        <XAxis
          dataKey="month"
          tickLine={false}
          allowDuplicatedCategory={false}
          xAxisId="month"
          tick={<CustomXAsisTick />}
          padding={{ left: 32, right: 48 }}
        >
          <StyledAxisLabel value="Month" position="bottom" />
        </XAxis>
        <YAxis yAxisId="price" domain={['dataMin - 100', 'auto']} tickLine={false} tick={<CustomLeftYAsisTick />}>
          <StyledAxisLabel value="Weighted Avg price per kg" position="left" angle={-90} />
        </YAxis>
        <Line
          yAxisId="price"
          name="Avg Price"
          connectNulls
          dataKey={(dataPoint: ProcessedDataType) => {
            const pointDate = dayjs(dataPoint.date_on)
            return pointDate.isAfter(dayjs()) ? null : dataPoint.avg_price
          }}
          stroke="#B76402"
          strokeWidth={2}
          dot={false}
        />
        <Area
          yAxisId="price"
          name="Price range"
          connectNulls
          dataKey="price_range"
          stroke="none"
          fill="#F9E3B680"
          dot={false}
          baseLine={6000}
          hide={!showPriceRange}
        />

        <YAxis yAxisId="climate_risk" orientation="right" tickLine={false} tick={<CustomRightYAsisTick />}>
          <StyledAxisLabel value="Weighted Avg % Risk (WA%R)" position="right" angle={-90} />
        </YAxis>
        <Line
          yAxisId="climate_risk"
          name="Climate Risk"
          connectNulls
          dataKey={(dataPoint: ProcessedDataType) => {
            const pointDate = dayjs(dataPoint.date_on)
            return pointDate.isAfter(dayjs()) ? null : dataPoint.risk
          }}
          stroke="#376BFA"
          strokeWidth={2}
          dot={false}
          hide={!showClimateRisk}
        />
        <Line
          yAxisId="climate_risk"
          name="Climate Risk"
          connectNulls
          dataKey={(dataPoint: ProcessedDataType) => {
            const pointDate = dayjs(dataPoint.date_on)
            return pointDate.isBefore(dayjs()) ? null : dataPoint.risk
          }}
          stroke="#376BFA"
          strokeWidth={2}
          dot={false}
          hide={!showClimateRisk}
          strokeDasharray="5 5"
        />
        <Tooltip content={<CustomTooltip />} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
