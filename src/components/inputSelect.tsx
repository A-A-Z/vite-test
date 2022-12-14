import { Fragment } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Listbox, Transition } from '@headlessui/react'
import { CaretDownIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { InputProps } from '../global/types'
import { getOptionName } from '../utils/form'

export const InputSelect = ({ id, name, options }: InputProps) => {
  const { control, formState: { isSubmitting } } = useFormContext()

  if (options === undefined || options.length === 0) {
    return <div />
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Listbox value={value} onChange={onChange} disabled={isSubmitting}>
          <div className="select">
            <Listbox.Button id={id} className="select__input field__input">
              <span>{getOptionName(value, options)}</span>
              <CaretDownIcon />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="select__list">
                {options.map((option, index) => (
                  <Listbox.Option
                    key={`option-${option.id || index}`}
                    className={({ selected }) => classNames('select__option', { 'select__option--selected': selected })}
                    value={option.id}
                  >
                    {() => (<>{option.name}</>)}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    />
  )
}
