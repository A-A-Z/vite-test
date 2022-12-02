import { useFormContext } from 'react-hook-form'
import { Icon } from './icon'

export interface SubmitBtnProps {
  submittingTxt?: string
  children?: React.ReactNode | string
}

export const SubmitBtn = ({ children, submittingTxt = 'Submitting' }: SubmitBtnProps) => {
  const { formState: { isSubmitting, isDirty } } = useFormContext()
  return isSubmitting
    ? <button type="submit" className="btn" disabled={true}><Icon icon={'CircleIcon'}>{submittingTxt}</Icon></button>
    : <button type="submit" className="btn" disabled={!isDirty}>{children}</button>
}
