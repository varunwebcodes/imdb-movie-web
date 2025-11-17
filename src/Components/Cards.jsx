import React, { useEffect, useState } from 'react'
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const poster = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const overview = movie?.overview
    ? movie.overview.slice(0, 118) + "..."
    : "No description available";

  return (
    <>
      {isLoading ? (
        <div className="pt-20">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link 
          to={`/movie/${movie.id}`} 
          className="block text-white no-underline"
        >
          <div className="p-2 rounded-lg hover:scale-110 transition-transform duration-300">

            {/* Poster */}
            <img
              className="w-full border h-[350px] object-cover rounded-xl shadow-lg"
              src={poster}
              alt={movie?.original_title}
            />

            {/* Text Content */}
            <div className="mt-3 space-y-1">

              <h3 className="text-lg font-bold leading-tight line-clamp-1">
                {movie?.original_title}
              </h3>

              <p className="text-sm opacity-80">
                {movie?.release_date}
                <span className="ml-2 text-yellow-400 font-semibold">
                  ⭐ {movie?.vote_average}
                </span>
              </p>

              <p className="text-sm opacity-70 line-clamp-3">
                {overview}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}

export default Cards;
