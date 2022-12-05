import { FilterText } from './filterText'
import { FilterSelect } from './filterSelect'
import { SelectOption } from '../global/types'

interface FilterSelectProps {
  type: 'text' | 'select' | undefined,
  onChangeFn: (selectedValue: string | number | undefined) => void
  isReadOnly?: boolean
  options?: SelectOption[]
}

export const Filter = ({ type, ...filterProps }: FilterSelectProps) => {
  let DynamicFilter

  switch (type) {
    case ('select'):
      DynamicFilter = FilterSelect
      break

    default:
      DynamicFilter = FilterText
  }

  return <DynamicFilter {...filterProps} />
}
