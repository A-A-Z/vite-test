import { CellFunc } from './utils'
import { CheckBox } from '../checkBox'

export const ColumnSelect: CellFunc = info => {
  const { getIsSelected, getToggleSelectedHandler } = info.row
  const isSelected = getIsSelected()
  return <CheckBox isSelected={isSelected} onToggle={getToggleSelectedHandler()} />
}
