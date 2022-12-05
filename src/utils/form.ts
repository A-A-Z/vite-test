import { SelectOption } from '../global/types'

export const getOptionName = (id: string, options: SelectOption[]): string => {
  const match = options.find((option) => option.id === id)
  return match?.name ?? ''
}
