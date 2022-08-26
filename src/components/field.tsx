import { memo, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { InputProps } from '../global/types'
import { InputText } from './inputText'
import { InputSelect } from './inputSelect'

interface FieldProps extends InputProps {
    label: string
    type?: 'text' | 'select'
}

type InputFunction = (props: InputProps) => JSX.Element

const InputTypesMap = {
    text: InputText,
    select: InputSelect
}

const Field = ({ id, name, label, type = 'text', options = [] }: FieldProps) => {
    const { formState: { errors } } = useFormContext()
    const hasError: boolean = !!errors?.[name]
    const Input: InputFunction = useMemo(() => InputTypesMap[type], [type])
    
    return (
        <div className={classNames('field', { 'field--error': hasError })}>
            <label className="field__label" htmlFor={id}>{label}</label>
            <Input id={id} name={name} options={options} />
            <ErrorMessage name={name} render={
                ({ message }) => <span className="field__error"><ExclamationTriangleIcon />{message}</span>
            } />
        </div>
    )
}

export default memo(Field)
