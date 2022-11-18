import React, { useEffect, useState } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { SongCard } from "./DashboardSongs";
import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from 'react-router-dom';
import MobileDetect from 'mobile-detect';

const getHeight = () => (window.innerHeight) || (document.documentElement.clientHeight) || (document.body.clientHeight);

const Home = () => {
  const [
    {
      searchTerm,
      isSongPlaying,
      song,
      allSongs,
      artistFilter,
      albumFilter,
      categoriaFilter,
      filteredSongs
    },
    dispatch,
  ] = useStateValue();
  const [height, setHeight] = useState(getHeight());
  const md = new MobileDetect(window.navigator.userAgent);
  const isMobile = md.mobile();

  useEffect(() => {
    const resizeListener = () => {
      setHeight(getHeight());
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, []);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      if (searchTerm.length > 0) {
        const miBusqueda = searchTerm.toLowerCase();
        const filtered = allSongs.filter(
          (data) =>
            data.artist.toLowerCase().includes(miBusqueda) ||
            data.name.toLowerCase().includes(miBusqueda) ||
            data.artist.includes(artistFilter)
        );
        dispatch({
          type: actionType.SET_FILTERED_SONGS,
          filteredSongs: filtered,
        });
        dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
        dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      } else {
        dispatch({
          type: actionType.SET_FILTERED_SONGS,
          filteredSongs: null,
        });
      }
    };
  }, [searchTerm]);

  useEffect(() => {
    if (artistFilter) {
      const filtered = allSongs?.filter((data) => data.artist === artistFilter);
      if (filtered && filtered.length > 0) {
        dispatch({
          type: actionType.SET_FILTERED_SONGS,
          filteredSongs: filtered,
        });
      } else {
        dispatch({
          type: actionType.SET_FILTERED_SONGS,
          filteredSongs: null,
        });
      }
    };
  }, [artistFilter]);

  useEffect(() => {
    if (categoriaFilter) {
      const filtered = allSongs?.filter((data) => data.category === categoriaFilter);
      if (filtered && filtered.length > 0) {
        dispatch({
          type: actionType.SET_FILTERED_SONGS,
          filteredSongs: filtered,
        });
      } else {
        dispatch({
          type: actionType.SET_FILTERED_SONGS,
          filteredSongs: null,
        });
      }
    };
  }, [categoriaFilter]);

  useEffect(() => {
    if (albumFilter) {
      const filtered = allSongs?.filter((data) => data.album === albumFilter);
      if (filtered && filtered.length > 0) {
        dispatch({
          type: actionType.SET_FILTERED_SONGS,
          filteredSongs: filtered,
        });
      } else {
        dispatch({
          type: actionType.SET_FILTERED_SONGS,
          filteredSongs: null,
        });
      }
    };
  }, [albumFilter]);

  return (
    <>     
      <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
        <Header />
        <SearchBar />
        <Filter />
        <div
          className="w-full overflow-y-auto pl-0 sm:pl-12"
          style={isMobile ? { height: height - 400 } : { height: height - 265 }}
          id="scrollableDiv"
        >
          <HomeSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
        </div>
      </div>
    </>
  );
};

export const HomeSongContainer = ({ musics }) => {
  const [{ isSongPlaying, song, filteredSongs, siteLoaded, rutas }, dispatch] = useStateValue();
  const addSongToContext = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };
  const [arrayParaScrolling, setArrayParaScrolling] = useState(null);
  const [page, setpage] = useState(1);
  const routeParams = useParams();
  const songId = routeParams.id;

  useEffect(() => {
    if (musics && musics.length > 0) {
      setArrayParaScrolling(null);
      setTimeout(() => {
        let myArray = musics.slice(0, 96);
        setArrayParaScrolling(myArray);
      }, 500);
      if (songId && !siteLoaded) {       
        const songIndex = musics.findIndex(song => song._id === songId);
        if (!isSongPlaying) {
          dispatch({
            type: actionType.SET_SONG_PLAYING,
            isSongPlaying: true,
          });
        }
        if (song !== songIndex) {
          dispatch({
            type: actionType.SET_SONG,
            song: songIndex,
          });
        };
        dispatch({
          type: actionType.SET_SITE_LOADED,
          siteLoaded: true,
        });
      };
    };
  }, [musics]);

  useEffect(() => {
    if (!filteredSongs && musics && musics.length > 0) {
      setpage(1);
      setArrayParaScrolling(null);
      setTimeout(() => {
        let myArray = musics.slice(0, 96);
        setArrayParaScrolling(myArray);
      }, 250);
    };
  }, [filteredSongs]);

  const fetchMoreData = () => {
    setTimeout(() => {
      const cantidad = page * 96;
      const tempArray = musics.slice(cantidad, (cantidad) + 96);
      let myArray = arrayParaScrolling.concat(tempArray);
      setArrayParaScrolling(myArray);
      setpage(page + 1);
    }, 1000);
  };

  return (
    <>
      {arrayParaScrolling && arrayParaScrolling.length > 0 && (
        <>
          <InfiniteScroll
            dataLength={arrayParaScrolling.length}
            next={() => fetchMoreData()}
            hasMore={true}
            loader={''}
            scrollableTarget="scrollableDiv"
            className="w-full flex items-start justify-start gap-2 sm:gap-4 flex-wrap pl-4"
          >
            {arrayParaScrolling?.map((data, index) => (
              <motion.div
                key={'item' + index}
                whileTap={{ scale: 0.8 }}
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                //transition={{ duration: 0.3, delay: index < 24 ? index * 0.1 : index * 0.1 }}
                transition={{ duration: 0.1, delay: index < 36 ? index * 0.1 : 0 }}
                className="relative w-[45%] sm:w-40 min-w-[45%] sm:min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
                onClick={() => addSongToContext(index)}
              >
                <div className="w-full sm:w-40 min-w-[100%] sm:min-w-[160px] h-30 sm:h-40 min-h-[130px] sm:min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={`https://trojanradio.link/images/${data.imageURL}`}
                    alt=""
                    className="relative w-full h-full rounded-lg object-cover z-15"
                  />
                </div>
                <p className="text-sm sm:text-base text-headingColor font-medium sm:font-semibold mt-2 mb-1 sm:mb-2">
                  {data.name}
                  <span className="block text-xs sm:text-sm text-gray-400 my-0 sm:my-1">
                    {data.artist}
                  </span>
                </p>
              </motion.div>
            ))}
          </InfiniteScroll>
        </>
      )}
    </>
  );
};

export default Home;
