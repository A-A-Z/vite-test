import { BoxIcon, CheckIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'

export interface CheckBoxProps {
  isSelected: boolean
  onToggle: (event: unknown) => void
  size?: number
}

export const CheckBox = ({ isSelected, onToggle, size = 16 }: CheckBoxProps) => (
  <button
    type="button"
    className={classNames('check-box', { 'check-box--selected': isSelected })}
    onClick={onToggle}
  >
    <BoxIcon width={size} height={size} className="check-box__select-icon" />
    {isSelected && <CheckIcon width={size} height={size} className="check-box__select-icon check-box__select-icon--check" />}
  </button>
)
