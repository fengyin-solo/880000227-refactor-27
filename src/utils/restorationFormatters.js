export function parsePageRange(value) {
  const raw = value == null ? '' : String(value)
  const text = raw.trim()

  if (!text) {
    return { raw, start: null, end: null, isRange: false, isValid: false }
  }

  const rangeMatch = text.match(/^(\d+)\s*[-–—~]\s*(\d+)$/)

  if (rangeMatch) {
    return {
      raw,
      start: Number(rangeMatch[1]),
      end: Number(rangeMatch[2]),
      isRange: true,
      isValid: true,
    }
  }

  if (/^\d+$/.test(text)) {
    const page = Number(text)

    return { raw, start: page, end: page, isRange: false, isValid: true }
  }

  return { raw, start: null, end: null, isRange: false, isValid: false }
}

export function formatPageRange(value) {
  return parsePageRange(value).raw
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
