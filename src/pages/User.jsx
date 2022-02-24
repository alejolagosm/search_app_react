import React from 'react';
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa';
import { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import GithubContext from '../context/github/GithubContext';
import { getUser, getUserRepos } from '../context/github/GithubActions';

import Spinner from '../components/layout/Spinner';
import RepoList from '../components/users/RepoList';

function User() {
  const { user, loading, repos, dispatch } = useContext(GithubContext);

  const params = useParams();

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });

    const getUserData = async () => {
      const user = await getUser(params.login);
      const repos = await getUserRepos(params.login);
      dispatch({ type: 'GET_USER', payload: user });
      dispatch({ type: 'GET_REPOS', payload: repos });
    };

    getUserData();
  }, [dispatch, params.login]);

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full mx-auto lg:w-10/12">
        <div className="mb-4">
          <Link to="/" className="btn">
            Back to Search
          </Link>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-3 mb-8 md:gap-8 items-center">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className="rounded-lg shadow-xl card image-full">
              <figure>
                <img src={avatar_url} alt="" />
              </figure>
              <div className="card-body justify-end items-center">
                <h2 className="card-title mb-0">{name}</h2>
                <h4>{login}</h4>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl card-title">
                {name}
                <div className="ml-2 mr-1 badge badge-success">{type}</div>
                {hireable && (
                  <div className="mx-1 badge badge-info">Hireable</div>
                )}
              </h1>
              <p>{bio}</p>
              <div className="mt-4 card-actions">
                <a
                  href={html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  Visit Profile
                </a>
              </div>
            </div>
            <div className="w-full rounded-lg shadow-md bg-base-100 flex flex-wrap justify-center md:gap-8 text-center ">
              {location && (
                <div className="stat w-auto">
                  <h2 className="stat-title text-md">Location</h2>
                  <p className="text-lg stat-value">{location}</p>
                </div>
              )}
              {blog && (
                <div className="stat w-auto">
                  <h2 className="stat-title text-md">Website</h2>
                  <p className="text-lg stat-value">
                    <a
                      href={`https://${blog}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {blog}
                    </a>
                  </p>
                </div>
              )}
              {twitter_username && (
                <div className="stat w-auto">
                  <h2 className="stat-title text-md">Twitter</h2>
                  <p className="text-lg stat-value">
                    <a
                      href={`https://twitter.com/${twitter_username}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {twitter_username}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 grid md:grid-cols-2 lg:grid-cols-4">
          <div className="stat">
            <div className="stat-figure text-teal-500">
              <FaUsers className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Followers</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">
              {followers}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-teal-500">
              <FaUserFriends className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Following</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">
              {following}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-teal-500">
              <FaCodepen className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Public Repos</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">
              {public_repos}
            </div>
          </div>
          <div className="stat">
            <div className="stat-figure text-teal-500">
              <FaStore className="text-3xl md:text-5xl" />
            </div>
            <div className="stat-title pr-5">Public Gists</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">
              {public_gists}
            </div>
          </div>
        </div>
        <RepoList repos={repos} />
      </div>
    </>
  );
}

export default User;
