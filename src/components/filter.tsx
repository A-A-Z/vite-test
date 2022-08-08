import { FilterText } from './filterText'
import { FilterSelect } from './filterSelect'
import { selectOption } from '../global/types'

interface FilterSelectProps {
    type: 'text' | 'select' | undefined,
    onChangeFn: Function
    options?: selectOption[]
}

export const Filter = ({ type, ...filterProps }: FilterSelectProps) => {
    let DynamicFilter

    switch(type) {
        case('select'):
            DynamicFilter = FilterSelect
            break

        default:
            DynamicFilter = FilterText
    }

    return <DynamicFilter {...filterProps} />
}
