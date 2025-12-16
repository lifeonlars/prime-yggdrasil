interface SectionTitleProps {
  children: string
}

export function SectionTitle({ children }: SectionTitleProps) {
  return <h2 className="text-900 font-bold text-xl mb-3">{children}</h2>
}
