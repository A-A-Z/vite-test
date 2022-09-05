import React from 'react'
import { Row } from '@tanstack/react-table'
import { Share2Icon } from '@radix-ui/react-icons'
import { Person } from '../global/types'

interface RowActionProps {
  name: string
  row: Row<Person>
  onClickFn: (row: Row<Person>) => void
}

export const RowAction = ({ name, row, onClickFn }: RowActionProps) => {
  const onClick = () => onClickFn(row)
  return (
    <button className="btn btn--row-action" onClick={onClick}><span className="btn__label">{name}</span><Share2Icon className="btn__icon" /></button>
  )
}
