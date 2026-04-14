import { StatusDisplay } from '@/lib/types'

interface Props {
  status: StatusDisplay
  small?: boolean
}

export default function StatusBadge({ status, small }: Props) {
  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-sm whitespace-nowrap ${
        small ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'
      }`}
      style={{
        color: status.color,
        backgroundColor: status.bgColor,
        border: `1px solid ${status.borderColor}`,
      }}
    >
      {status.label}
    </span>
  )
}
