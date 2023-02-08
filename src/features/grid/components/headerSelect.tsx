import { HeaderFunc } from '../utils'
import { CheckBox } from 'components/checkBox'

export const HeaderSelect: HeaderFunc = info => {
  const { getIsAllRowsSelected, getToggleAllRowsSelectedHandler } = info.table
  const isSelected = getIsAllRowsSelected()
  return <CheckBox isSelected={isSelected} onToggle={getToggleAllRowsSelectedHandler()} />
}
