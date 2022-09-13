import classNames from 'classnames'

export interface CheckBoxProps {
  isSelected: boolean
  onToggle: (event: unknown) => void
}

export const CheckBox = ({ isSelected, onToggle }: CheckBoxProps) => (
  <button
    type="button"
    className={classNames('checkbox', { 'checkbox--selected': isSelected })}
    onClick={onToggle}
  >
    <div className={classNames('checkbox__icon', { 'checkbox__icon--checked': isSelected })} />
  </button>
)
