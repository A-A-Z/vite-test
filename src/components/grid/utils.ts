import { CellContext } from '@tanstack/react-table'

// types

export type CellFunc = <T>(info: CellContext<T, unknown>) => JSX.Element | string | null
