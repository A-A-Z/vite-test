
// types

// enums

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

export type PersonPicture = {
    large: string
    medium: string
    thumbnail: string
}
export interface Person {
    id: PersonId
    name: PersonName
    email: string
    dob: PersonDob
    location: PersonLocation
    picture: PersonPicture
}

export interface PersonSimple {
    id: string
    name: string
}

export interface PersonFormData {
    firstName: string
    lastName: string
    email: string
    state: string
}

export type selectOption = {
    name: string
    id?: number | string
    unavailable?: boolean
}

export interface InputProps {
    id: string
    name: string
    options?: selectOption[]
}
