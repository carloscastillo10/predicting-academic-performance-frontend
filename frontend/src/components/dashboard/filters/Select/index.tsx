'use client'
import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import styles from './Select.module.css'
import { Search } from '@components/dashboard/Search'
import { useSelectFilter } from '@hooks/useSelectFilter'
import { SearchProps } from '@utils/dashboard'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props extends SearchProps {
  defaulValue: number
  searcheable?: boolean
}

export function SelectFilter({ items, defaulValue, searcheable }: Props): React.JSX.Element {
  const { searchValue, setSearchValue, searchedItems } = useSelectFilter({
    items: items,
  })

  items = searchedItems

  const [selected, setSelected] = useState(items[defaulValue])
  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className="relative mt-2">
            <Listbox.Button
              className={`${styles.dropdown_item_selected} flex justify-center items-center rounded-lg bg-white py-1.5 pr-3 text-left text-gray-600 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-custom sm:text-sm sm:leading-6`}
              aria-expanded="true"
            >
              <span className="ml-1 block truncate text-sm text-gray-600 font-bold px-3">{selected.value}</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
            </Listbox.Button>
            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="scrollbar-show scrollbar-x-hidden absolute z-20 min-w-[6rem] md:max-w-[13rem] lg:max-w-[13.5rem] max-h-[25rem] overflow-auto mt-1 rounded-2xl bg-white py-1 shadow-lg focus:ring-2 focus:ring-container">
                {searcheable ? <Search searchValue={searchValue} setSearchValue={setSearchValue} /> : null}
                {!items.length && <span className="text-gray-600 block w-full ml-1 px-3 py-1 font-medium text-sm">No hay concidencias</span>}
                {items?.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ selected, active }) =>
                      classNames(selected || active ? 'bg-custom rounded-lg w-full text-white' : 'text-white', 'relative cursor-pointer flex justify-between items-center')
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(active || selected ? 'text-white font-bold' : 'text-gray-600', 'block w-full ml-1 px-3 py-1 font-medium text-sm')}>{item.value}</span>
                        {selected ? <CheckIcon className="h-5 w-5 mr-3" aria-hidden="true" /> : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </>
  )
}

/*
<Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-1.5 pl-3 pr-10 text-left text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-custom sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-1 block truncate text-sm text-gray-600 font-medium">{selected.value}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-white py-1 text-sm shadow-lg ring-1 ring-gray-600 ring-opacity-5 focus:outline-none sm:text-sm">
                  {items.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        classNames(
                          active ? 'flex items-center bg-custom rounded-2xl text-white font-extrabold [&>span]:fill-white' : 'text-gray-600',
                          'relative cursor-default select-none pt-1 pb-1 pl-1 pr-4',
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span className={classNames(selected ? 'font-bold' : 'font-normal', 'ml-3 block truncate')}>{item.value}</span>
                          </div>

                          {selected ? (
                            <span className={classNames(active ? 'text-whit' : 'text-gray-600 font-bold', 'absolute inset-y-0 right-0 flex items-center pr-4')}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
*/
