
// types

// enums

export enum StatusEnum {
    approved,
    draft,
    finalised
}

export enum CycleEnum {
    fortnightly = 'FORTNIGHT',
    monthly_advance = 'MONTHLY_ADVANCE',
    monthly_arrears = 'MONTHLY_ARREARS',
    national = 'NATIONAL',
    quarterly = 'QUARTERLY',
    weekly = 'WEEKLY'
}

// interfaces

export type Invoice = {
    id: number
    status: StatusEnum
    cycle: CycleEnum
    description: string
    clientId: number
    clientName: string
    divisionId: number
} 
