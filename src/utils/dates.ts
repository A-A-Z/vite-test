export const formatDateText = (date: Date): string => date.toLocaleDateString('en-AU')

export const getTodayAsString = (): string => new Date().toString()
