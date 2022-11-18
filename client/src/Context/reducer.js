export const actionType = {
  SET_USER: "SET_USER",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_FILTER_TERM: "SET_FILTER_TERM",
  SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
  SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_SONGS: "SET_ALL_SONGS",
  SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
  SET_ALL_ALBUMS: "SET_ALL_ALBUMS",
  SET_ALL_CATEGORIES: "SET_ALL_CATEGORIES",
  SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
  SET_CATEGORIA_FILTER: "SET_CATEGORIA_FILTER",
  SET_SONG: "SET_SONG",
  SET_SONG_PLAYING: "SET_SONG_PLAYING",
  SET_MINI_PLAYER: "SET_MINI_PLAYER",
  SET_FILTERED_SONGS: "SET_FILTERED_SONGS",
  SET_FILTER_MENU_ARTISTES: "SET_FILTER_MENU_ARTISTES",
  SET_FILTER_MENU_ALBUMS: "SET_FILTER_MENU_ALBUMS",
  SET_FILTER_MENU_CATEGORIES: "SET_FILTER_MENU_CATEGORIES",
  SET_SITE_LOADED: "SET_SITE_LOADED",
  SET_IS_PLAYLIST: "SET_IS_PLAYLIST"
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    case actionType.SET_FILTER_TERM:
      return {
        ...state,
        filterTerm: action.filterTerm,
      };
    case actionType.SET_LANGUAGE_FILTER:
      return {
        ...state,
        languageFilter: action.languageFilter,
      };
    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };
    case actionType.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };
    case actionType.SET_ALL_ARTISTS:
      return {
        ...state,
        allArtists: action.allArtists,
      };
    case actionType.SET_ALL_ALBUMS:
      return {
        ...state,
        allAlbums: action.allAlbums,
      };
    case actionType.SET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.allCategories,
      };
    case actionType.SET_ARTIST_FILTER:
      return {
        ...state,
        artistFilter: action.artistFilter,
      };
    case actionType.SET_ALBUM_FILTER:
      return {
        ...state,
        albumFilter: action.albumFilter,
      };
    case actionType.SET_CATEGORIA_FILTER:
      return {
        ...state,
        categoriaFilter: action.categoriaFilter,
      };
    case actionType.SET_FILTER_MENU_ARTISTES:
      return {
        ...state,
        filterMenuArtistes: action.filterMenuArtistes,
      };
    case actionType.SET_FILTER_MENU_ALBUMS:
      return {
        ...state,
        filterMenuAlbums: action.filterMenuAlbums,
      };
    case actionType.SET_FILTER_MENU_CATEGORIES:
      return {
        ...state,
        filterMenuCategories: action.filterMenuCategories,
      };
    case actionType.SET_SONG:
      return {
        ...state,
        song: action.song,
      };
    case actionType.SET_SONG_PLAYING:
      return {
        ...state,
        isSongPlaying: action.isSongPlaying,
      };
    case actionType.SET_MINI_PLAYER:
      return {
        ...state,
        miniPlayer: action.miniPlayer,
      };
    case actionType.SET_FILTERED_SONGS:
      return {
        ...state,
        filteredSongs: action.filteredSongs,
      };
    case actionType.SET_SITE_LOADED:
      return {
        ...state,
        siteLoaded: action.siteLoaded,
      };
    case actionType.SET_IS_PLAYLIST:
      return {
        ...state,
        isPlayList: action.isPlayList,
      };
    default:
      return state;
  }
};

export default reducer;
