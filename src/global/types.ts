
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

export type PersonId = {
    name: string,
    value: string | null
}

export type PersonName = {
    first: string
    last: string
    title: string
}

export type PersonDob = {
    age: number
    date: string
}

export type PersonLocation = {
    city: string
    coordinates: object
    country: string
    postcode: number
    state: string
    street: object
    timezone: object
}

export type Person = {
    id: PersonId
    name: PersonName
    email: string
    dob: PersonDob
    location: PersonLocation
}

export type Invoice = {
    id: number
    status: StatusEnum
    cycle: CycleEnum
    description: string
    clientId: number
    clientName: string
    divisionId: number
} 
