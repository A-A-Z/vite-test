import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { SelectOption } from '../global/types'

interface FilterSelectProps {
  onChangeFn: (selectedValue: string | number | undefined) => void
  options?: SelectOption[]
  isReadOnly?: boolean
}

export const FilterSelect = ({ options, onChangeFn, isReadOnly }: FilterSelectProps) => {
  if (options === undefined || options.length === 0) {
    return null
  }

  const [selected, setSelected] = useState(options[0])

  const onChangeCall = (option: SelectOption) => {
    setSelected(option)
    onChangeFn(option.id)
  }

  return (
    <Listbox value={selected} onChange={onChangeCall} disabled={isReadOnly}>
      <div className="filter filter--select">
        <Listbox.Button className="filter__input">
          <span>{selected.name}</span>
          <CaretDownIcon />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        <Listbox.Options className="filter__list">
          {options.map((option, index) => (
          <Listbox.Option
            key={`option-${option.id || index}`}
            className={({ selected }) => classNames('filter__option', { 'filter__option--selected': selected })}
            value={option}
          >
            {() => (
            <>
              {option.name}
            </>
            )}
          </Listbox.Option>
          ))}
        </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
