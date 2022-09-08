import { CellContext, HeaderContext } from '@tanstack/react-table'

// types
export type CellFunc = <T>(info: CellContext<T, unknown>) => JSX.Element | string | null
export type HeaderFunc = <T>(info: HeaderContext<T, unknown>) => JSX.Element | string | null
