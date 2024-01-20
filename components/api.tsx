import FetchFromApi from '@/utils/FetchFromApi';

export const fetchPopularShows = async () => {
  const { data } = await FetchFromApi.get('tv/popular');
  return data?.results;
};

export const fetchTopRatedShows = async () => {
  const { data } = await FetchFromApi.get('tv/top_rated');
  return data?.results;
};

export const fetchPopularMovies = async () => {
  const { data } = await FetchFromApi.get('movie/popular');
  return data?.results;
};