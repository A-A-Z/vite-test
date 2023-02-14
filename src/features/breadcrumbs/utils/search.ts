export const isSearchValid = (input: unknown, validLength = 3): boolean => typeof input === 'string' && input.length >= validLength
