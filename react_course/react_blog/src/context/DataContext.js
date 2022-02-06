import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  return (
    <DataContext.Provider value={{
      search, setSearch, // Nav component 
      searchResults, fetchError, isLoading, // Home component 
      posts, setPosts // EditPost component 
    }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataContext;

// redux로 refactoring 했으므로 더이상 필요없다. 