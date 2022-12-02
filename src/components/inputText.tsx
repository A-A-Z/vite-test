import { InputProps } from '../global/types'
import { useFormContext } from 'react-hook-form'

export const InputText = ({ id, name }: InputProps) => {
  const { register, formState: { isSubmitting } } = useFormContext()
  return <input id={id} className="field__input field__input--text" disabled={isSubmitting} data-lpignore="true" {...register(name)} />
}
