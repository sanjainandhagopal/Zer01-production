"use client"
import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [selectedOption, setSelectedOption] = useState('Option 1');
  
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  
  return (
   <div className="px-5 -mt-28">
     <div className="flex items-center justify-between p-2 w-full max-w-lg bg-transparent border-2 border-white rounded-full mx-auto">
      {/* Left section: Dropdown button */}
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="bg-transparent text-white border-none outline-none text-sm"
      >
        <option className='bg-black' value="Option 1">Option 1</option>
        <option className='bg-black' value="Option 2">Option 2</option>
        <option className='bg-black' value="Option 3">Option 3</option>
      </select>

      {/* Right section: Input field with search SVG */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-white border-none outline-none p-2"
        />
        <button className="p-2">
          <Search/>
        </button>
      </div>
    </div>
   </div>
  );
};

export default SearchBar;
