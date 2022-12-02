// import { Fragment } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useFormContext, Controller } from 'react-hook-form'
import { InputProps } from '../global/types'

// interface InputRadioProps {
//   onChangeFn: (selectedValue: string | number | undefined) => void
//   options?: selectOption[]
//   isReadOnly?: boolean
// }

export const InputRadio = ({ id, name, options }: InputProps) => {
  const { control, formState: { isSubmitting } } = useFormContext()

  if (options === undefined || options.length === 0) {
    return <div />
  }

  // const onChangeCall = (option: selectOption) => {
  //   setSelected(option)
  //   onChangeFn(option.id)
  // }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <RadioGroup id={id} value={value} onChange={onChange} disabled={isSubmitting}>
          <RadioGroup.Label>Test</RadioGroup.Label>
          {options.map((option, index) => (
            <RadioGroup.Option key={`option-${option.id || index}`} value={option}>
              {({ checked }) => (
                <span className={checked ? 'bg-blue-200' : ''}>{option.name}</span>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      )}
    />
  )
}
