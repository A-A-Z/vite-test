import React, { MouseEventHandler } from 'react'
import { Share2Icon } from '@radix-ui/react-icons'

interface RowActionProps {
    name: string
    onClickFn: MouseEventHandler
}

export const RowAction = ({ name, onClickFn }:RowActionProps) => (
    <button className="btn btn--row-action" onClick={onClickFn}><Share2Icon className="btn__icon" />{name}</button>
)
