import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Movie({ movie }) {
  const navigate = useNavigate();
  const [posterloading, setPosterLoading] = useState(true);

  let background = "bg-gray-500";

  if (movie.vote_average >= 1 && movie.vote_average <= 4) {
    background = "bg-infra-red";
  } else if (movie.vote_average > 4 && movie.vote_average <= 7) {
    background = "bg-crayola";
  } else if (movie.vote_average > 7 && movie.vote_average <= 10) {
    background = "bg-caribbean-green";
  } else {
    background = "bg-gray-500";
  }

  function handlePosterLoad() {
    setPosterLoading(false);
  }

  function handleMovieDetails(id) {
    navigate(`/movie?id=${id}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const image_Path = "https://image.tmdb.org/t/p/w500";
  return (
    <div
      className={`${background} p-2 `}
      onClick={() => handleMovieDetails(movie.id)}
    >
      <div className="w-full overflow-hidden">
        <img
          className={
            posterloading
              ? "w-full aspect-2/3 animate-pulse bg-prussian-blue"
              : "w-full cursor-pointer hover:scale-125 transition aspect-2/3"
          }
          src={
            movie.poster_path
              ? `${image_Path}${movie.poster_path}`
              : `assets/no-image-found.svg`
          }
          alt="movie-poster"
          onLoad={handlePosterLoad}
        />
      </div>
      <div className="flex items-center justify-between font-mono py-2 text-lg md:text-xl">
        <div className="flex items-center gap-1">
          <img src="/assets/star.svg" />
          <span className="text-prussian-blue">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
        <span className="text-prussian-blue">
          {movie.release_date.substring(0, 4)}
        </span>
      </div>
    </div>
  );
}

export default Movie;
