const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

//   Get users
export const searchUsers = async text => {
  // Define search parameters for the URL query
  const params = new URLSearchParams({
    q: text,
  });

  // Get data from the API
  const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
  const { items } = await response.json();

  return items;
};

//   Get single user
export const getUser = async login => {
  // Get data from the API
  const response = await fetch(`${GITHUB_URL}/users/${login}`);

  if (response.status === 404) {
    window.location = '/notfound';
  } else {
    const data = await response.json();

    return data;
  }
};

//   Get repos
export const getUserRepos = async login => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  // Get data from the API
  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);
  const data = await response.json();

  return data;
};
