import { RadioGroup } from '@headlessui/react'
import { useFormContext, Controller } from 'react-hook-form'
import { InputProps } from '../global/types'
import { Icon } from './icon'

export const InputRadio = ({ id, name, options }: InputProps) => {
  const { control, formState: { isSubmitting } } = useFormContext()

  if (options === undefined || options.length === 0) {
    return <div />
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <RadioGroup id={id} value={value} onChange={onChange} disabled={isSubmitting} className="radio">
          {options.map((option, index) => (
            <RadioGroup.Option
              key={`option-${option.id || index}`}
              value={option.id}
              className="radio__option"
            >
              {({ checked }) => (<Icon icon={checked ? 'RadiobuttonIcon' : 'CircleIcon'}>{option.name}</Icon>)}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      )}
    />
  )
}
