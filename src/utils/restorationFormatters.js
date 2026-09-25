const PAGE_SEGMENT_PATTERN = /^(\d+)(?:\s*[-–—－]\s*(\d+))?$/

export function parsePageRange(value) {
  if (value === null || value === undefined) return null

  const text = String(value).trim()
  if (!text) return null

  const segments = []
  for (const part of text.split(/[,，]/)) {
    const match = part.trim().match(PAGE_SEGMENT_PATTERN)
    if (!match) return null
    segments.push({
      start: Number(match[1]),
      end: match[2] === undefined ? null : Number(match[2]),
    })
  }
  return segments
}

export function formatPageRange(value) {
  if (value === null || value === undefined) return ''

  const segments = parsePageRange(value)
  // 无法解析的输入保持原样输出，与现有展示行为一致
  if (!segments) return value

  return segments
    .map(({ start, end }) => (end === null ? `${start}` : `${start}-${end}`))
    .join(',')
}

export function riskMeta(risk) {
  const map = {
    high: {
      label: '高',
      tone: 'high',
    },
    medium: {
      label: '中',
      tone: 'medium',
    },
    low: {
      label: '低',
      tone: 'low',
    },
  }

  return map[risk] ?? map.low
}
