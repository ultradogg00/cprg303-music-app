import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoriteAlbumContext = createContext();

export const useFavoriteAlbum = () => {
  return useContext(FavoriteAlbumContext);
};

export const FavoriteAlbumProvider = ({ children }) => {
  const [favoriteAlbums, setFavoriteAlbums] = useState(() => {
    // Get favorite albums from local storage on app load
    const savedFavorites = localStorage.getItem('favoriteAlbums');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const toggleFavorite = (albumId) => {
    setFavoriteAlbums((prevFavorites) => {
      let newFavorites;
      if (prevFavorites.includes(albumId)) {
        // If the album is already a favorite, remove it
        newFavorites = prevFavorites.filter((id) => id !== albumId);
      } else {
        // If the album is not a favorite, add it
        newFavorites = [...prevFavorites, albumId];
      }
      // Save the updated favorites in local storage
      localStorage.setItem('favoriteAlbums', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <FavoriteAlbumContext.Provider value={{ favoriteAlbums, toggleFavorite }}>
      {children}
    </FavoriteAlbumContext.Provider>
  );
};

