import { DATE_FORMAT_PATTERN } from '../components/dateRangePicker/constants'

export const formatDateText = (date: Date): string => date.toLocaleDateString('en-AU')

export const getTodayAsString = (): string => new Date().toString()

/**
 * Creates a Date object from a string in the format 'dd/mm/yyyy'.
 *
 * @param {string} dateString - The string to be converted to a Date object.
 * @returns {Date} The Date object created from the input string, or a default value if the input string is in an invalid format.
 */
export const createDateFromDateString = (dateString: string): Date => {
  if (!DATE_FORMAT_PATTERN.test(dateString)) {
    console.warn(`Invalid date format: ${dateString}. Expected format is dd/mm/yyyy.`)
    return new Date()
  }

  const dateParts = dateString.split('/')
  const day = parseInt(dateParts[0], 10)
  const month = parseInt(dateParts[1], 10) - 1
  const year = parseInt(dateParts[2], 10)

  return new Date(year, month, day)
}
