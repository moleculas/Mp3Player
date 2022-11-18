import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

const FilterButtonsCategories = ({ filterData, flag }) => {
    const [filterName, setFilterName] = useState(null);
    const [filterMenu, setFilterMenu] = useState(false);

    const [{
        artistFilter,
        albumFilter,
        categoriaFilter,
        filterMenuArtistes,
        filterMenuAlbums,
        filterMenuCategories
    }, dispatch] = useStateValue();

    useEffect(() => {
        dispatch({ type: actionType.SET_FILTER_MENU_CATEGORIES, filterMenuCategories: false });
    }, []);

    useEffect(() => {
        if (filterMenu) {
            dispatch({ type: actionType.SET_FILTER_MENU_CATEGORIES, filterMenuCategories: true });
            dispatch({ type: actionType.SET_FILTER_MENU_ALBUMS, filterMenuAlbums: false });
            dispatch({ type: actionType.SET_FILTER_MENU_ARTISTES, filterMenuArtistes: false });
        };
    }, [filterMenu]);

    useEffect(() => {
        if (filterMenuAlbums || filterMenuArtistes) {
            setFilterMenu(false);
        };
    }, [filterMenuAlbums, filterMenuArtistes]);

    useEffect(() => {
        if (artistFilter) {
            setFilterName(null);
            setFilterMenu(false);
        };
        if (!albumFilter && !artistFilter && !categoriaFilter) {
            setFilterName(null);
            setFilterMenu(false);
        };
        dispatch({
            type: actionType.SET_SONG_PLAYING,
            isSongPlaying: false,
        });
    }, [albumFilter, artistFilter, categoriaFilter]);

    const updateFilterButton = (name) => {
        setFilterName(name);
        setFilterMenu(false);
        dispatch({ type: actionType.SET_CATEGORIA_FILTER, categoriaFilter: name });
        dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
        dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
        dispatch({
            type: actionType.SET_SEARCH_TERM,
            searchTerm: '',
        });
    };

    return (
        <div className="w-full sm:w-auto border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400">
            <p
                className="text-base tracking-wide text-textColor flex items-center gap-2 truncate sm:text-clip"
                onClick={() => setFilterMenu(!filterMenu)}
            >
                {!filterName && flag}
                {filterName && (
                    <>
                        {filterName}
                    </>
                )}
                <IoChevronDown
                    className={`text-base text-textColor duration-150 transition-all ease-in-out ${filterMenu ? "rotate-180" : "rotate-0"
                        }`}
                />
            </p>
            {filterData && filterMenu && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="w-full sm:w-96 z-50 backdrop-blur-xl mt-2 max-h-[300px] overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0"
                >
                    {filterData?.map((data, index) => (
                        <div
                            key={'gen' + index}
                            className="flex items-center gap-2 px-4 py-1 hover:bg-gray-200"
                            onClick={() => updateFilterButton(data)}
                        >
                            <p className="w-full">
                                {data}
                                {/* {data.name.length > 15
                  ? `${data.name.slice(0, 14)}...`
                  : data.name} */}
                            </p>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default FilterButtonsCategories;
