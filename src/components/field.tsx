import { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FieldProps {
    id: string
    name: string
    label: string
}

const Field = ({ id, name, label }: FieldProps) => {
    const { register, formState: { errors } } = useFormContext()
    const hasError: boolean = !!errors?.[name]
    
    return (
        <div className={classNames('field', { 'field--error': hasError })}>
            <label className="field__label" htmlFor={id}>{label}</label>
            <input id={id} className="field__input field__input--text" {...register(name)} />
            <ErrorMessage name={name} render={({ message }) => <span className="field__error"><ExclamationTriangleIcon />{message}</span>} />
        </div>
    )
}

export default memo(Field)
