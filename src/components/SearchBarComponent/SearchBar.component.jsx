import "./SearchBar.styles.css"

const SearchBar = ({setSearch}) => {
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div className="search-container"> 
      <input 
        className="search-bar"
        type="search"
        placeholder="Type here to search for note"
        onChange={handleSearch}>
      </input>
    </div>
  )
}

export default SearchBar;