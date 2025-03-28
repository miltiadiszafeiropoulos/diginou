import React, { createContext, useState, useCallback, useRef } from 'react';
import { MenuHttpService } from '../httpServices/MenuHttpService';

export const MenuContext = createContext(null);

export function MenuContextProvider({ children }) {
  const [menuInfo, setMenuInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFetching = useRef(false);

  // ADD THESE TWO LINES:
  const [searchTerm, setSearchTerm] = useState("");  

  const fetchMenu = useCallback(async (lang, menuId) => {
    if (isFetching.current) {
      return;
    }

    if (menuInfo && menuInfo.lang === lang && menuInfo.menuId === menuId) {
      return;
    }

    setLoading(true);
    setError(null);
    isFetching.current = true;

    try {
      const data = await MenuHttpService.GetMenuInfo(lang, menuId);
      setMenuInfo({ ...data, lang, menuId });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu:', error);
      setError(error.message || 'Failed to fetch menu');
      setLoading(false);
    } finally {
      isFetching.current = false;
    }
  }, [menuInfo]);

  const clearMenu = useCallback(() => {
    setMenuInfo(null);
    setError(null);
  }, []);

  const menuContextValue = {
    menuInfo,
    fetchMenu,
    clearMenu,
    loading,
    error,
    setLoading,
    // EXPOSE searchTerm AND setSearchTerm:
    searchTerm,
    setSearchTerm
  };

  return (
    <MenuContext.Provider value={menuContextValue}>
      {children}
    </MenuContext.Provider>
  );
}
