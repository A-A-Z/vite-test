import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { CaretDownIcon } from '@radix-ui/react-icons'
import { selectOption } from '../global/types'

interface FilterSelectProps {
    onChangeFn: Function
    options?: selectOption[]
}

export const FilterSelect = ({ options, onChangeFn }: FilterSelectProps) => {
    if (options === undefined || options.length === 0) {
        return null
    }

    const [selected, setSelected] = useState(options[0])

    const onChangeCall = (option: selectOption) => {
        setSelected(option)
        onChangeFn(option.id)
    }

    return (
      <Listbox value={selected} onChange={onChangeCall}>
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
                  {({ selected }) => (
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
