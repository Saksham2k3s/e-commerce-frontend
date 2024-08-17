import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { fetchProducts } from '../redux/slice/ProductSlice';
import { useDispatch } from 'react-redux';
function Search() {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = () => {
       dispatch(fetchProducts({query : searchQuery}));
    }
  return (
   
      <div className='border border-darkslategray text-darkslategray rounded-full flex w-[20%] bg-white px-5 gap-4 justify-start items-center align-middle' >
       <div className=' cursor-pointer ' onClick={handleSearch} >
       <RiSearchLine size={20} />
       </div>
       <input type="text" placeholder='Search Product name' className=' border-none focus:border-none outline-none' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  />
      </div>
    
  );
}

export default Search;