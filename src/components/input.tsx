import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

interface InputProps {
    id: string
    name: string
    label: string
}

export const Input = ({ id, name, label }: InputProps) => {
    const { register, formState: { errors } } = useFormContext()
    //const hasError = !!errors?.[name]
    
    return (
        <div className="field">
            <label className="field__label" htmlFor={id}>{label}</label>
            <input id={id} className="field__input field__input--text" {...register(name)} />
            <ErrorMessage errors={errors} name={name} render={({ message }) => <span className="field_error">{message}</span>} />
        </div>
    )
}
