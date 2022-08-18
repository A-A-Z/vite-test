import { useFormContext } from 'react-hook-form'

interface InputProps {
    name: string
}

export const Input = ({ name }: InputProps) => {
    const { register, formState: { errors } } = useFormContext()
    const hasError = !!errors?.[name]
    
    return (
        <div>
            <input {...register(name)} />
            {hasError && <p>{`${errors?.[name]?.message || ''}`}</p>}
        </div>
    )
}
