
interface FilterTextProps {
    onChangeFn: Function
}

export const FilterText = ({ onChangeFn }: FilterTextProps) => {
    const onChangeCall = (e: React.ChangeEvent<HTMLInputElement>) => onChangeFn(e.target.value)
    return (
        <div className="filter filter--text">
            <input type="text" className="filter__input" onChange={onChangeCall} />
        </div>
    )
}
