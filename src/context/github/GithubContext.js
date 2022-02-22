import { createContext, useReducer } from 'react';

import githubReducer from './GithubReducer';

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //   Get users
  const searchUsers = async text => {
    //   Set Loading to true to display the Spinner Component
    setLoading();
    // Define search parameters for the URL query
    const params = new URLSearchParams({
      q: text,
    });

    // Get data from the API
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();

    // Change the state with the fetched data by using Reducer Hooks
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  //   Clear Users
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  //   Set Loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
