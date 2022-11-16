import { Filter } from '../filter'
import { GridKeys, GridCellHeaderProps } from './types'

export const GridCellHeaderFilter = <T extends object, K extends GridKeys>({ header: { isPlaceholder, column }, isDisabled }: GridCellHeaderProps<T, K>) => (
  isPlaceholder
    ? <th className="grid__cell-filter">&nbsp;</th>
    : <th className="grid__cell-filter">
      <Filter
        type={column.columnDef.meta?.filterType}
        options={column.columnDef.meta?.selectOptions}
        onChangeFn={(selectedValue: string | number | undefined) => column.setFilterValue(selectedValue)}
        isReadOnly={isDisabled}
      />
    </th>
)
