'use client'
import {
  ChartLayout,
  ChartRow,
  ChartRowGraph,
  ChartRowLegend,
  DateFilters,
  Filters,
  Header,
  HeaderButtons,
  HeaderText,
  LegendItem,
  LegendTitle,
} from '@/components/applesChart/appleChart.styles'
import { ApplesChartChart } from '@/components/applesChart/applesChart.chart'
import { testData } from '@/data/testData'
import ArrowUp from '@/icons/arrow-up.svg'
import BlueSquare from '@/icons/blue-square.svg'
import BrownSquare from '@/icons/brown-square.svg'
import ChevronDown from '@/icons/chevron-down.svg'
import DotedLine from '@/icons/doted-line.svg'
import Expand from '@/icons/expand.svg'
import Info from '@/icons/info.svg'
import LightBrownSquare from '@/icons/light-brown-square.svg'
import { filterByDateRange, findDateRange, processRawData } from '@/utils/date.functions'
import { Checkbox, DatePicker, Form } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React from 'react'

export const AppleChartLayout: React.FC = () => {
  const [form] = Form.useForm()
  const screens = useBreakpoint()
  const startDate = Form.useWatch('startDate', form)
  const endDate = Form.useWatch('endDate', form)

  const datesRange = findDateRange(testData)

  return (
    <Form
      labelCol={screens.xs ? { span: 8 } : undefined}
      wrapperCol={screens.xs ? { span: 16 } : undefined}
      layout={screens.xs ? 'inline' : 'vertical'}
      initialValues={{
        startDate: datesRange.minDate,
        endDate: datesRange.maxDate,
        showClimateRisk: true,
        showPriceRanges: true,
      }}
      form={form}
    >
      <ChartLayout>
        <Header>
          <HeaderText>Global Price of Apples (per kg)</HeaderText>
          <HeaderButtons>
            <Expand />
            <ArrowUp />
            <Info />
          </HeaderButtons>
        </Header>
        <Filters>
          <DateFilters>
            <Form.Item label="Start date" name="startDate">
              <DatePicker
                suffixIcon={<ChevronDown />}
                format="MMM YYYY"
                minDate={datesRange.minDate}
                maxDate={datesRange.maxDate}
                picker="month"
                allowClear={false}
                inputReadOnly
              />
            </Form.Item>
            <Form.Item label="End Date" name="endDate">
              <DatePicker
                suffixIcon={<ChevronDown />}
                format="MMM YYYY"
                minDate={datesRange.minDate}
                maxDate={datesRange.maxDate}
                picker="month"
                allowClear={false}
                inputReadOnly
              />
            </Form.Item>
          </DateFilters>
        </Filters>
        <ChartRow>
          <ChartRowGraph>
            <ApplesChartChart data={processRawData(filterByDateRange(testData, startDate, endDate))} />
          </ChartRowGraph>
          <ChartRowLegend>
            <LegendTitle>Options</LegendTitle>
            <Form.Item
              name="showClimateRisk"
              valuePropName="checked"
              label={null}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Checkbox>Show climate risk</Checkbox>
            </Form.Item>
            <Form.Item
              name="showPriceRanges"
              valuePropName="checked"
              label={null}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            >
              <Checkbox>Show price ranges</Checkbox>
            </Form.Item>
            <LegendTitle>Legend</LegendTitle>
            <LegendItem>
              <BlueSquare />
              Climate Risk
            </LegendItem>
            <LegendItem>
              <BrownSquare />
              Avg Price
            </LegendItem>
            <LegendItem>
              <DotedLine />
              Forecasted Climate Risk
            </LegendItem>
            <LegendItem>
              <LightBrownSquare />
              Price Range (Max & Min)
            </LegendItem>
          </ChartRowLegend>
        </ChartRow>
      </ChartLayout>
    </Form>
  )
}
