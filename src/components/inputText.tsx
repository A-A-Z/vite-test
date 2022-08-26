import { InputProps } from '../global/types'
import { useFormContext } from 'react-hook-form'

export const InputText = ({ id, name }: InputProps) => {
    const { register } = useFormContext()
    return <input id={id} className="field__input field__input--text" {...register(name)} />
}
