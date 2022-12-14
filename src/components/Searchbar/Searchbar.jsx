import {useState } from "react";
import css from 'components/Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';


export default function Searchbar({onChange}) {
    const [searchName, setSearchName] = useState('');
   

    const handleChange = (e) => {
        return setSearchName(e.target.value.trim().toLowerCase());
    }


     const handleSubmit = (e) => {
         e.preventDefault();
        if (searchName.trim() === '') {
            alert('Enter request name')
            return;
        }
       setSearchName(searchName) 
       onChange(searchName)
        setSearchName("");
    }


        return (
        <header className={css.searchBar}>
  <form className={css.searchForm} onSubmit={handleChange}>
    <button type="submit" className={css.searchButton} onClick={handleSubmit}>
      <span className={css.searchButton_label}>Search</span>
    </button>
    <input
      className={css.searchInput}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
        onChange={handleChange}
    value={searchName}
    />
  </form>
</header>
        
    )
}

Searchbar.propTypes = {
    searchName: PropTypes.string,
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
}