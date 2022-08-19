import { memo } from 'react'
import { SortDirection } from '@tanstack/react-table'
import { CaretUpIcon, CaretDownIcon, CaretSortIcon } from '@radix-ui/react-icons';

interface SortingIconProps {
    type: SortDirection | false
}
const SortingIcon = ({ type }: SortingIconProps) => {
    let content
    switch(type) {
        case('asc'):
            content = <CaretUpIcon className="sorting-icon sorting-icon--active" />
            break

        case('desc'):
            content = <CaretDownIcon className="sorting-icon sorting-icon--active" />
            break
        
        default:
            content = <CaretSortIcon className="sorting-icon" />
    }

    return content
}

export default memo(SortingIcon)
