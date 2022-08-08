import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { selectOption } from '../global/types'

// const people:selectOption[] = [
//     { id: 'Tasmania', name: 'Tasmania' },
//     { id: 'Victoria', name: 'Victoria' },
// ]

interface FilterSelectProps {
    onChangeFn: Function
    options?: selectOption[]
}

export const FilterSelect = ({ options, onChangeFn }: FilterSelectProps) => {
    if (options === undefined) {
        return null
    }

    const [selected, setSelected] = useState(options[0])

    const onChangeCall = (option: selectOption) => {
        setSelected(option)
        onChangeFn(option.id)
    }

    return (
      <Listbox value={selected} onChange={onChangeCall}>
        <div>
          <Listbox.Button>
            <span>{selected.name}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options>
              {options.map((option, index) => (
                <Listbox.Option
                  key={`option-${option.id || index}`}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span>
                            X
                        </span>
                      ) : null}
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
