import classNames from 'classnames'

export default classNames

interface modifier {
  [key: string]: boolean
}

// wrapper for className to work with BEM formatted modifiers
export const bemNames = (blockName: string, modifiers: modifier): string => {
  const modifiersAttr = Object.entries(modifiers).reduce((obj, [key, val]) => (
    { ...obj, [`${blockName}--${key}`]: val }
  ), {} as modifier)

  return classNames(blockName, modifiersAttr)
}
