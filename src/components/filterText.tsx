
interface FilterTextProps {
    onChangeFn: Function
}

export const FilterText = ({ onChangeFn }: FilterTextProps) => {
    const onChangeCall = (e: React.ChangeEvent<HTMLInputElement>) => onChangeFn(e.target.value)
    return <input type="text" className="grid__cell-filter-input" onChange={onChangeCall} />
}
