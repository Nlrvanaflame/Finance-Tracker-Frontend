export interface RecordFilterProps {
  filter: {
    date: string
    type: string
    amount: string
  }
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}
