import React, { useEffect } from "react";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { getAllAlbums, getAllArtist } from "../api";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FilterButtonsArtistes from "./FilterButtonsArtistes";
import FilterButtonsAlbums from "./FilterButtonsAlbums";
import FilterButtonsCategories from "./FilterButtonsCategories";

const Filter = () => {
  const [{ allArtists, allAlbums, allCategories, filteredSongs, allSongs }, dispatch] = useStateValue();
  const categories = [
    'Roots Reggae',
    'Reggae',
    'Rocksteady',
    'Dub',
    'Dancehall',
    'Ska',
    'Jump Blues',
    'Rhythm & Blues',
    'Jazz',
    'Instrumental',
    'Lovers Rock',
    'Reggae Gospel',
    'Funk-Soul',
    'Reggae-Pop',
    'Soul',
    'Jazz-Funk',
    'Calypso',
    'Funk',
    'Mento',
    'Rhythm and blues',
    'Soul-Jazz',
    'Afrobeat',
    'Soca',
    'Ragga',
    'Steel Band',
    'Jazz-Rock'
  ];

  useEffect(() => {
    if (!allArtists) {
      getAllArtist().then((data) => {
        const artistasOrdenados = data.data.sort((a, b) => a.name.localeCompare(b.name));
        dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: artistasOrdenados });
      });
    };
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.data });
      });
    };
    if (!allCategories) {
      dispatch({ type: actionType.SET_ALL_CATEGORIES, allCategories: categories });
    };
  }, []);

  const clearAllFilter = () => {
    //setFilteredSongs(null);
    dispatch({ type: actionType.SET_FILTERED_SONGS, filteredSongs: null });
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_CATEGORIA_FILTER, categoriaFilter: null });
    dispatch({ type: actionType.SET_SEARCH_TERM, searchTerm: '' });
    dispatch({
      type: actionType.SET_SONG_PLAYING,
      isSongPlaying: false,
    });
  };
  return (
    <div className="w-full my-3 sm:my-4 px-6 pt-0 sm:pt-4 pb-2 sm:pb-4 flex flex-col sm:flex-row justify-start md:justify-center gap-4 sm:gap-10">
      <FilterButtonsCategories filterData={allCategories} flag={"Gèneres"} />
      <FilterButtonsArtistes filterData={allArtists} flag={"Artistes"} />
      <FilterButtonsAlbums filterData={allAlbums} flag={"Àlbums"} />
      <div className="flex flex-row justify-between gap-5 sm:gap-10">
        <button
          className="bg-red-500 hover:bg-red-700 text-white py-1 px-6 sm:px-4 rounded"
          onClick={clearAllFilter}
        >
          <p className="text-base">Neteja filtres</p>
        </button>
        <p className="text-xl font-bold">
          <span className="text-sm font-semibold text-textColor">
            Total cançons :{" "}
          </span>
          {filteredSongs ? filteredSongs?.length : allSongs?.length}
        </p>
      </div>
    </div>
  );
};

export default Filter;
