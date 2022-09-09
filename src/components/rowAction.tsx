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
    <button className="row-action" onClick={onClick}><span className="row-action__label">{name}</span><Share2Icon className="row-action__icon" /></button>
  )
}
