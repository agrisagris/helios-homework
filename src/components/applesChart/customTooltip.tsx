import { TooltipBox, TooltipText } from '@/components/applesChart/appleChart.styles'
import BlueSquare from '@/icons/blue-square.svg'
import BrownSquare from '@/icons/brown-square.svg'
import LightBrownSquare from '@/icons/light-brown-square.svg'
import React from 'react'
import { TooltipPayload } from 'recharts'

const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: TooltipPayload[]; label: string }) => {
  const entryIcon = {
    'Avg Price': <BrownSquare />,
    'Price range': <LightBrownSquare />,
    'Climate Risk': <BlueSquare />,
  }

  if (active && payload && payload.length) {
    return (
      <TooltipBox>
        <span>{label}</span>
        {payload.map((entry, index) => {
          const isArray = Array.isArray(entry.value)
          if (isArray && entry.value[0] === null) return
          return (
            <TooltipText key={`item-${index}`}>
              {entryIcon[entry.name]}
              {entry.name}: {isArray ? `${entry.value[0]}~${entry.value[1]}` : entry.value}
            </TooltipText>
          )
        })}
      </TooltipBox>
    )
  }
  return null
}

export default CustomTooltip
