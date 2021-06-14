import React from 'react'

const Search = props => {

  return(
    <>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" onChange={props.onSearch} value={props.search} />
    </>
  )
}

export default Search