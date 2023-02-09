import { CellFunc } from '../utils'
import { CheckBox } from 'components/checkBox'

export const ColumnSelect: CellFunc = (info, config) => {
  const { getIsSelected, getToggleSelectedHandler, original } = info.row

  if (config?.isHidden === true || (typeof config?.isHidden === 'function' && config.isHidden(original))) {
    return null
  }

  const isSelected = getIsSelected()
  return <CheckBox isSelected={isSelected} onToggle={getToggleSelectedHandler()} />
}
