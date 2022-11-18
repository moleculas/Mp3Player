import React from "react";
import { IoSearch } from "react-icons/io5";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

const SearchBar = () => {
  const [{ searchTerm }, dispatch] = useStateValue();

  const setSearchTerm = (value) => {
    dispatch({
      type: actionType.SET_SONG_PLAYING,
      isSongPlaying: false,
    });
    dispatch({
      type: actionType.SET_SEARCH_TERM,
      searchTerm: value,
    });
  };

  return (
    <div className="w-full my-4 h-12 sm:h-16 bg-card flex items-center justify-center">
      <div className="w-full gap-4 px-4 pt-2 sm:pt-4 pb-2 sm:pb-4 md:w-2/3 bg-primary shadow-xl mt-6 sm:mt-12 rounded-md flex items-center">
        <IoSearch className="text-xl sm:text-2xl text-textColor" />
        <input
          type="text"
          value={searchTerm}
          className="w-full h-full bg-transparent text-base sm:text-lg text-textColor border-none outline-none "
          placeholder="Cerca ..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
