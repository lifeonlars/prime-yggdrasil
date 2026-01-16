export type FlagCountry = 'denmark' | 'finland' | 'norway' | 'sweden' | 'uk'

interface FlagProps {
  country: FlagCountry
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const sizeMap = {
  small: 20,
  medium: 24,
  large: 32,
}

export function Flag({ country, size = 'medium', className = '' }: FlagProps) {
  const width = sizeMap[size]
  const height = Math.round(width * 0.667) // 3:2 aspect ratio for flags

  return (
    <img
      src={`/flag-${country}.svg`}
      alt={`${country} flag`}
      width={width}
      height={height}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    />
  )
}
