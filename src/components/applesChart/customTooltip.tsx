import { TooltipBox, TooltipText } from '@/components/applesChart/appleChart.styles'
import BlueSquare from '@/icons/blue-square.svg'
import BrownSquare from '@/icons/brown-square.svg'
import LightBrownSquare from '@/icons/light-brown-square.svg'
import React from 'react'

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { name: string; value: string | number | (string | number | null)[] }[]
  label?: string
}) => {
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
          if (Array.isArray(entry.value) && entry.value[0] === null) return
          return (
            <TooltipText key={`item-${index}`}>
              {entryIcon[entry.name as keyof typeof entryIcon]}
              {entry.name}: {Array.isArray(entry.value) ? `${entry.value[0]}~${entry.value[1]}` : entry.value}
            </TooltipText>
          )
        })}
      </TooltipBox>
    )
  }
  return null
}

export default CustomTooltip
