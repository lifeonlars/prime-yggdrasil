interface SectionTitleProps {
  children: string
}

export function SectionTitle({ children }: SectionTitleProps) {
  return <h2 className="text-color font-bold text-xl mb-3">{children}</h2>
}
