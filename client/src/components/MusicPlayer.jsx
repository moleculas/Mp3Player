import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo, IoArrowUndo, IoMusicalNote, IoLogoTwitter } from "react-icons/io5";
import { motion } from "framer-motion";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { actionType } from "../Context/reducer";
import { MdPlaylistPlay } from "react-icons/md";
import { getAllSongs } from "../api";
import { RiPlayListFill } from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroll-component";
import { TwitterShareButton } from "react-share";
import MobileDetect from 'mobile-detect';

const MusicPlayer = () => {
  const [{ allSongs, song, isSongPlaying, miniPlayer, filteredSongs, isPlayList }, dispatch] =
    useStateValue();
  const [arrayCanciones, setArrayCanciones] = useState(allSongs);
  const md = new MobileDetect(window.navigator.userAgent);
  const isMobile = md.mobile();

  useEffect(() => {
    if (!filteredSongs) {
      setArrayCanciones(allSongs);
    } else {
      setArrayCanciones(filteredSongs);
    };
  }, [filteredSongs]);

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    if (miniPlayer) {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: false,
      });
    } else {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: true,
      });
    }
  };

  const nextTrack = () => {
    if (song >= (arrayCanciones.length - 1)) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song + 1,
      });
    }
  };

  const previousTrack = () => {
    if (song === 0) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song - 1,
      });
    }
  };

  useEffect(() => {
    if (song > arrayCanciones.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    }
  }, [song]);

  const BotonTw = (props) => {
    const { id, name, artist, ...other } = props;
    return (
      <motion.i
        whileHover={{ scale: 1.1 }}
      >
        <TwitterShareButton url={`https://trojanradio.link/${id}`} title={`${name} | ${artist}`}>
          <IoLogoTwitter
            className="text-[#868686] hover:text-headingColor text-2xl cursor-pointer ml-2"
          />
        </TwitterShareButton>
      </motion.i>
    )
  };

  const BotonPl = () => {
    return (
      <motion.i
        whileHover={{ scale: 1.1 }}
        onClick={() => dispatch({ type: actionType.SET_IS_PLAYLIST, isPlayList: !isPlayList })}
      >
        <RiPlayListFill className="text-[#868686] hover:text-headingColor text-2xl cursor-pointer" />
      </motion.i>
    )
  };

  return (
    <div className="w-full full flex items-center gap-3 overflow-hidden border-t-2 border-grey-500">
      <div className={`w-full flex-col sm:flex-row full items-start sm:items-center gap-0 sm:gap-3 p-0 sm:p-4 ${miniPlayer ? "absolute top-40" : "sm:flex relative"}`}>
        <div className="sm:hidden flex flex-row pt-2 pr-2 justify-end relative gap-2 -mb-4">
          <div className="bg-[#f5f3f4]/30 p-1 rounded-full">
            <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
              <IoMdClose
                className="text-textColor hover:text-headingColor text-base cursor-pointer"
              />
            </motion.i>
          </div>
        </div>
        <div className="flex flex-row w-full sm:w-auto sm:min-w-[50%] gap-3 px-4 pt-4 sm:pt-0 sm:px-0">
          <img
            src={`https://trojanradio.link/images/${arrayCanciones[song]?.imageURL}`}
            className="hidden sm:block sm:w-60 sm:h-20 object-cover rounded-md"
            alt=""
          />
          <div className="flex items-start flex-col">
            <p className="text-base sm:text-xl text-headingColor font-semibold">
              {arrayCanciones[song]?.name}{" "}
              <span className="text-sm sm:text-base">{arrayCanciones[song]?.album}</span>
            </p>
            <p className="text-sm sm:text-base text-textColor">
              {arrayCanciones[song]?.artist}
              <span className="text-xs sm:text-sm text-textColor font-semibold">
                {" "}({arrayCanciones[song]?.category})
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex sm:flex-1 w-full">
            <AudioPlayer
              src={`https://trojanradio.link/files/${arrayCanciones[song]?.songUrl}`}
              onPlay={() => console.log("is playing")}
              onEnded={nextTrack}
              autoPlay={true}
              showSkipControls={true}
              onClickNext={nextTrack}
              onClickPrevious={previousTrack}
              autoPlayAfterSrcChange={true}
              customVolumeControls={isMobile ? [] : [RHAP_UI.VOLUME]}
              customAdditionalControls={
                [
                  !isMobile && RHAP_UI.LOOP,
                  <BotonPl />,
                  <BotonTw id={arrayCanciones[song]?._id} name={arrayCanciones[song]?.name} artist={arrayCanciones[song]?.artist} />,
                ]
              }
            />
          </div>
          <div className="hidden sm:block ml-2">
            <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
              <IoMdClose
                className="text-textColor hover:text-headingColor text-2xl cursor-pointer"
                style={{ marginBottom: 40 }}
              />
            </motion.i>
          </div>
        </div>
      </div>
      {isPlayList && (
        <>
          <PlayListCard />
        </>
      )}
      {miniPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed right-2 bottom-2 "
        >
          <div className="w-40 h-40 rounded-full flex items-center justify-center  relative ">
            <div className="absolute inset-0 rounded-full bg-red-600 blur-xl animate-pulse"></div>
            <img
              onClick={togglePlayer}
              src={arrayCanciones[song]?.imageURL}
              className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
              alt=""
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const PlayListCard = () => {
  const [{ allSongs, song, isSongPlaying, filteredSongs }, dispatch] = useStateValue();
  const [arrayCanciones, setArrayCanciones] = useState(allSongs);
  const [arrayParaScrolling, setArrayParaScrolling] = useState(null);
  const [page, setpage] = useState(1);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!filteredSongs) {
      setArrayCanciones(allSongs);
    } else {
      setArrayCanciones(filteredSongs);
    };
  }, [filteredSongs]);

  useEffect(() => {
    if (arrayCanciones && arrayCanciones.length > 0) {
      setArrayParaScrolling(null);
      setTimeout(() => {
        let myArray = arrayCanciones.slice(0, 24);
        setArrayParaScrolling(myArray);
      }, 100);
    };
  }, [arrayCanciones]);

  useEffect(() => {
    if (!filteredSongs && arrayCanciones && arrayCanciones.length > 0) {
      setpage(1);
      setArrayParaScrolling(null);
      setTimeout(() => {
        let myArray = arrayCanciones.slice(0, 24);
        setArrayParaScrolling(myArray);
      }, 100);
    };
  }, [filteredSongs]);

  const fetchMoreData = () => {
    setTimeout(() => {
      const cantidad = page * 24;
      const tempArray = arrayCanciones.slice(cantidad, (cantidad) + 24);
      let myArray = arrayParaScrolling.concat(tempArray);
      setArrayParaScrolling(myArray);
      setpage(page + 1);
    }, 550);
  };

  const setCurrentPlaySong = (songindex) => {
    dispatch({ type: actionType.SET_IS_PLAYLIST, isPlayList: false });
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== songindex) {
      dispatch({
        type: actionType.SET_SONG,
        song: songindex,
      });
    }
  };

  return (
    <div id="scrollableDiv2" className="absolute left-0 sm:left-[50%] bottom-40 sm:bottom-32 gap-2 py-2 w-[100%] sm:w-350 sm:max-w-[350px] h-510 sm:max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
      {arrayParaScrolling && arrayParaScrolling.length > 0 && (
        <InfiniteScroll
          dataLength={arrayParaScrolling.length}
          next={() => fetchMoreData()}
          hasMore={true}
          //loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv2"
        >
          {arrayParaScrolling?.map((music, index) => (
            <motion.div
              key={'pl_' + index}
              initial={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              //transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`group w-full px-4 pt-2 sm:pt-4 pb-2 sm:pb-4 hover:bg-card flex gap-3 items-center cursor-pointer ${music?._id === song._id ? "bg-card" : "bg-transparent"
                }`}
              onClick={() => setCurrentPlaySong(index)}
            >
              <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />

              <div className="flex items-start flex-col">
                <p className="text-base sm:text-lg text-headingColor font-semibold">
                  {`${music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                    }`}{" "}
                  <span className="text-sm sm:text-base">({music?.album})</span>
                </p>
                <p className="text-textColor">
                  {music?.artist}{" "}
                  <span className="text-xs sm:text-sm text-textColor font-semibold">
                    ({music?.category})
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default MusicPlayer;
