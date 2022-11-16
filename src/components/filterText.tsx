interface FilterTextProps {
  onChangeFn: (selectedValue: string | number | undefined) => void
  isReadOnly?: boolean
}

export const FilterText = ({ onChangeFn, isReadOnly = false }: FilterTextProps) => {
  const onChangeCall = (e: React.ChangeEvent<HTMLInputElement>) => onChangeFn(e.target.value)
  return <input type="text" className="filter__input" onChange={onChangeCall} readOnly={isReadOnly} data-lpignore="true" />
}
