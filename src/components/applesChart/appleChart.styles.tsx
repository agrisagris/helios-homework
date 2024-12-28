import { CustomXTickProps } from '@/data/types'
import dayjs from 'dayjs'
import React from 'react'
import { Label } from 'recharts'
import styled from 'styled-components'

export const StyledAxisLabel = styled(Label)`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  text-anchor: middle;
  letter-spacing: 0.32px;
  fill: var(--primary-text);
`
StyledAxisLabel.displayName = Label.displayName

const StyledXAsisTick = styled.text<{ fontWeight?: number; fill?: string }>`
  font-size: 12px;
  font-weight: ${(props) => props.fontWeight || 400};
  line-height: 16px;
  letter-spacing: 0.32px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  fill: ${(props) => props.fill || 'var(--helper-text)'};
`

export const CustomXAsisTick = ({ x, y, payload }: CustomXTickProps) => {
  if (!x || !y) return ''

  return (
    <g transform={`translate(${x},${y})`}>
      <StyledXAsisTick
        x={0}
        y={0}
        dy={16}
        fontWeight={payload?.value === dayjs().format('MMM') ? 700 : undefined}
        fill={payload?.value === dayjs().format('MMM') ? '#181818' : undefined}
      >
        {payload?.value}
      </StyledXAsisTick>
    </g>
  )
}

export const CustomLeftYAsisTick = ({ x, y, payload }: CustomXTickProps) => {
  if (!x || !y) return ''

  return (
    <g transform={`translate(${x - 32},${y})`}>
      <StyledXAsisTick x={0} y={0}>
        {payload?.value}
      </StyledXAsisTick>
    </g>
  )
}

export const CustomRightYAsisTick = ({ x, y, payload }: CustomXTickProps) => {
  if (!x || !y) return ''

  return (
    <g transform={`translate(${x + 8},${y})`}>
      <StyledXAsisTick x={0} y={0}>
        {`${payload?.value}%`}
      </StyledXAsisTick>
    </g>
  )
}

export const ChartLayout = styled.div`
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-content: baseline;
  justify-content: space-between;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`
export const HeaderText = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-left: 12px;

  @media (max-width: 576px) {
    width: 100%;
  }
`
export const HeaderButtons = styled.div`
  display: flex;
  flex-direction: row-reverse;
`

export const Filters = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-content: center;
  justify-content: space-between;
`

export const DateFilters = styled.div`
  margin-left: 32px;
  display: flex;
  flex-direction: row;
  align-content: center;

  gap: 17px;
  border-radius: 5px 0px 0px 0px;
  opacity: 0px;

  .ant-form-item-label label {
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.32px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: var(--secondary-text);
  }

  .ant-picker {
    width: 179px;
    height: 32px;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    background: #f3f3f3;
    padding: 7px 16px;
  }

  .ant-picker-input input {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.16px;
    color: var(--primary-text);
  }

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
  }
`

export const ChartRow = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

export const ChartRowGraph = styled.div`
  width: 75%;
  @media (max-width: 1024px) {
    width: 100%;
  }
`

export const ChartRowLegend = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  margin-left: 32px;

  .ant-form-item {
    margin-bottom: 4px;
    line-height: 20px;
  }

  & .ant-form-item:last-of-type {
    margin-bottom: 8px;
  }

  .ant-form-item-control-input {
    min-height: unset;
  }

  .ant-checkbox-wrapper span {
    line-height: 18px;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.16px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    color: var(--secondary-text);
  }

  .ant-checkbox-inner {
    background-color: #2e57b5;
    border-color: #2e57b5;
    border-radius: 1.5px;
    height: 15px;
    width: 15px;
    line-height: 15px;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`

export const LegendTitle = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;

  font-size: 14px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--secondary-text);
`

export const LegendItem = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;

  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--secondary-text);

  svg {
    vertical-align: middle;
    margin-right: 4px;
  }
`

export const EmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;

  & > span,
  .ant-skeleton {
    width: fit-content !important;
    margin-top: 16px;
  }
`

export const TooltipText = styled.div`
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: var(--secondary-text);

  svg {
    vertical-align: middle;
    margin-right: 4px;
  }
`

export const TooltipBox = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  padding: 8px;
`
