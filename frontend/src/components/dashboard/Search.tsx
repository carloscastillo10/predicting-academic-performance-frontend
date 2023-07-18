import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
}

export function Search({ searchValue, setSearchValue }: Props): React.JSX.Element {
  const onSearchValueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  return (
    <>
      <input
        type="text"
        className="mt-2 bg-container text-gray-600 caret-custom block mx-1 px-3 py-1 mb-2 font-medium text-sm rounded-lg focus:outline-container md:w-[189px] lg:w-[202px]"
        value={searchValue}
        onChange={onSearchValueChangeHandler}
        placeholder="Buscar"
      />
    </>
  )
}
