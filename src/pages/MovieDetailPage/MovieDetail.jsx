import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cast from "../../components/Cast";
import KeyContext from "../../context/keyContext";

function useId() {
  return new URLSearchParams(useLocation().search);
}

function MovieDetail() {
  const id = useId().get("id");
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posterLoading, setPosterLoading] = useState(true);
  const [backdropLoading, setBackdropLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_key = useContext(KeyContext);
  const img_base_path = "https://image.tmdb.org/t/p/w500";

  async function fetchData(getId) {
    try {
      const [movieResponse, castResponse] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${getId}?api_key=${API_key}&language=en-US`
        ),
        fetch(`https://api.themoviedb.org/3/movie/${getId}/credits?api_key=${API_key}&language=en-US
`),
      ]);
      const movieData = await movieResponse.json();
      const castData = await castResponse.json();
      setMovie(movieData);
      setCast(castData.cast);
      setCrew(castData.crew);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  let hour = Math.floor(movie.runtime / 60);
  let minutes = movie.runtime - hour * 60;
  let director = "";
  crew.map((person) => {
    if (person.job === "Director") {
      director = person.name;
    }
  });
  let color = "text-gray-500";
  if (movie.vote_average >= 1 && movie.vote_average <= 4) {
    color = "text-infra-red";
  } else if (movie.vote_average > 4 && movie.vote_average <= 7) {
    color = "text-crayola";
  } else if (movie.vote_average > 7 && movie.vote_average <= 10) {
    color = "text-caribbean-green";
  } else {
    color = "text-gray-500";
  }

  useEffect(() => {
    fetchData(id);
  }, [id]);

  function handleposterLoading() {
    setPosterLoading(false);
  }

  function handleBackdropLoading() {
    setBackdropLoading(false);
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col bg-prussian-blue">
        <span className="loader"></span>
      </div>
    );
  }

  if (error !== null) {
    return (
      <div className="w-full h-screen flex items-center justify-center flex-col bg-prussian-blue">
        <p className="text-red-600">{error}</p>
        <img src="assets/page-not-found.png" alt="cat" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen overflow-x-hidden overflow-y-auto bg-prussian-blue text-blue-green font-mono py-4 lg:p-8">
      <p className="text-3xl font-extrabold px-3 sm:text-4xl md:text-5xl">
        {movie.title}
      </p>
      <div className="px-3 sm:text-xl md:text-2xl md:mb-3">
        <span className="mr-1">{movie.release_date.substring(0, 4)}</span>
        <span className="mr-1">&middot;</span>
        <span className="mr-1">
          {hour !== 0 && `${hour}h`}
          {minutes !== 0 && `${minutes}m`}
        </span>
        <span className="mr-1">&middot;</span>
        <span>{movie.original_language}</span>
      </div>
      <div className="relative flex items-center">
        <div className="w-full my-2 bg-gradient-to-r from-transparent from-20% to-white md:grid md:grid-cols-2 ">
          <div className="bg-black"></div>
          <div className="md:bg-gradient-to-r from-black from-10% to-white">
            <img
              src={
                movie.backdrop_path
                  ? `${img_base_path}${movie.backdrop_path}`
                  : "assets/no-image-found.svg"
              }
              className={
                backdropLoading
                  ? "w-full aspect-375/211 animate-pulse bg-prussian-blue mix-blend-multiply"
                  : "w-full aspect-375/211 bg-prussian-blue mix-blend-multiply"
              }
              alt="movie-backdrop"
              onLoad={handleBackdropLoading}
            />
          </div>
        </div>
        <img
          src={
            movie.poster_path
              ? `${img_base_path}${movie.poster_path}`
              : `assets/no-image-found.svg`
          }
          className={
            posterLoading
              ? "w-2/6 absolute rounded-xl left-3 sm:left-5 aspect-2/3 animate-pulse bg-prussian-blue"
              : "w-2/6 absolute rounded-xl left-3 sm:left-5 aspect-2/3 md:w-1/6"
          }
          alt="movie-poster"
          onLoad={handleposterLoading}
        />
        <div className="hidden text-2xl absolute md:block md:left-1/4 w-1/2">
          {movie.genres &&
            movie.genres.map((gen, i) => (
              <p
                key={i}
                className="shrink-0 text-blue-green mr-2 border border-blue-green py-1 px-2 my-2 text-center "
              >
                {gen.name}
              </p>
            ))}
        </div>
      </div>
      <div className="my-2 mx-3 flex overflow-x-auto sm:text-xl md:hidden">
        {movie.genres &&
          movie.genres.map((gen, i) => (
            <span
              key={i}
              className="shrink-0 text-blue-green mr-2 border border-blue-green py-1 px-2"
            >
              {gen.name}
            </span>
          ))}
      </div>
      <div className="px-3 py-2 sm:text-xl md:grid md:grid-cols-2 md:gap-4 md:border-y-2 md:mx-3 border-blue-green md:mt-6">
        <div>
          <p className="py-2 text-justify border-y-2 border-blue-green md:border-none md:text-2xl">
            {movie.overview}
          </p>
        </div>
        <div className="md:flex md:flex-col md:justify-evenly md:text-2xl">
          <p className="py-2 border-b-2 border-blue-green text-center">
            <span className="text-crayola mr-1">&#9733;</span>
            <span className={`${color}`}>{movie.vote_average.toFixed(1)}</span>
            &#47;10 &#40;{movie.vote_count}&#41;
          </p>
          <p className="py-2 text-justify border-b-2 border-blue-green md:text-center">
            <strong className="mr-3">Director</strong>
            {director}
          </p>
          <p className="py-2 text-justify border-b-2 border-blue-green md:text-center">
            <strong className="mr-3">Budget</strong>
            <span className="text-infra-red">{movie.budget}</span>&#36;
          </p>
          <p className="py-2 text-justify border-b-2 border-blue-green md:border-none md:text-center">
            <strong className="mr-3">Revenue</strong>
            <span className="text-caribbean-green">{movie.revenue}</span>&#36;
          </p>
        </div>
      </div>
      {cast.length !== 0 && (
        <div>
          <p className="py-4 text-blue-green font-mono text-2xl sm:text-3xl text-center lg:text-6xl">
            Cast
          </p>
          <div className="px-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {cast.map((actor, index) => (
              <Cast key={index} actor={actor} />
            ))}
          </div>
        </div>
      )}
      <p className="text-center py-4 sm:text-xl md:text-2xl">{movie.tagline}</p>
    </div>
  );
}

export default MovieDetail;
