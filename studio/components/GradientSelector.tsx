import React, { useState } from 'react'
import { Card, Text, Stack, Flex, Label } from '@sanity/ui'
import { FormField, PatchEvent, set, unset } from 'sanity'
import type { ArrayOfPrimitivesInputProps } from 'sanity'

interface ColorOption {
  title: string
  value: string
}

// Fixed color list
const COLORS: ColorOption[] = [
  { title: 'Selfiesat Green', value: '#266D45' },
  { title: 'Selfiesat Blue', value: '#4265B3' },
  { title: 'Selfiesat Yellow', value: '#FEAA02' },
  { title: 'Selfiesat Dark Blue', value: '#0E2F4C' },
  { title: 'Selfiesat Light Blue', value: '#297075' },

  { title: 'Framsat Pink', value: '#D0378E' },
  { title: 'Framsat Blue', value: 'rgb(96, 154, 212)' },
  { title: 'Framsat Yellow', value: '#FEAA02' },
  { title: 'Framsat Red', value: '#B62B0D' },
  { title: 'Framsat Gray', value: '#37EDDA' },

  { title: 'Biosat Blue', value: '#027EE2' },
  { title: 'Biosat Dark Green', value: 'rgb(15, 46, 38)' },
  { title: 'Biosat Yellow', value: '#FEAA02' },
  { title: 'Biosat Green', value: '#3FCA3F' },
  { title: 'Biosat Light Green', value: '#94CA94' },
]

export default function GradientSelector(
  props: ArrayOfPrimitivesInputProps<string>
) {
  const { onChange, value = [] } = props

  // Initialize selected colors based on titles or values
  const [selectedColors, setSelectedColors] = useState<ColorOption[]>(() =>
    (value || [])
      .map((v) => COLORS.find((c) => c.value === v || c.title === v))
      .filter((c): c is ColorOption => !!c)
  )

  const toggleColor = (title: string) => {
    const existing = selectedColors.find((c) => c.title === title)
    let newColors: ColorOption[]
    if (existing) {
      // Remove the color by title
      newColors = selectedColors.filter((c) => c.title !== title)
    } else {
      // Add the color by title
      const colorToAdd = COLORS.find((c) => c.title === title)
      if (!colorToAdd) return
      newColors = [...selectedColors, colorToAdd]
    }

    setSelectedColors(newColors)
    onChange(newColors.length ? set(newColors.map((c) => c.value)) : unset())
  }

  const gradient = selectedColors.length
    ? `linear-gradient(135deg, ${selectedColors.map((c) => c.value).join(', ')})`
    : '#fff'

  return (
  <FormField>
    {/* Selected colors pills */}
    {selectedColors.length > 0 && (
      <Stack space={1} marginBottom={2} marginTop={2}>
        <Flex gap={2} wrap="wrap" marginTop={2}>
          {selectedColors.map((c) => (
            <span
              key={c.title}
              style={{
                display: 'inline-block',
                padding: '2px 8px',
                borderRadius: '12px',
                background: c.value,
                color: '#fff',
                fontSize: '12px',
                fontWeight: 500,
                boxShadow: '0 0 2px rgba(0,0,0,0.5)',
              }}
            >
              {c.title}
            </span>
          ))}
        </Flex>
      </Stack>
    )}

    {/* Gradient preview */}
    <div
      style={{
        height: '120px',
        marginBottom: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        background: gradient,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        transition: 'background 0.3s ease',
      }}
    />

    {/* Color buttons */}
    <Card padding={2} radius={2} shadow={1} border tone="default">
      <Stack space={2}>
        {COLORS.map((color) => {
          const selected = selectedColors.find((c) => c.title === color.title)
          return (
            <Flex
              key={color.title}
              align="center"
              gap={2}
              style={{
                cursor: 'pointer',
                background: selected ? '#f0f0f0' : 'transparent',
                borderRadius: '6px',
                padding: '4px',
                transition: 'all 0.2s',
              }}
              onClick={() => toggleColor(color.title)}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: color.value,
                  border: '1px solid #ccc',
                  transition: 'all 0.2s',
                }}
                title={color.title}
              />
              <Label>
                <Text size={2}>{color.title}</Text>
              </Label>
            </Flex>
          )
        })}
      </Stack>
    </Card>
  </FormField>
)

}
