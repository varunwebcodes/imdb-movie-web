import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=b08248bc4b97d37e543fca2d4705eb6b&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  return (
    <div className="w-full h-full ">
      <div className="w-full mx-auto pt-18 h-[550px] rounded-lg overflow-hidden">
        <Carousel
  showThumbs={false}
  autoPlay
  transitionTime={3}
  infiniteLoop
  showStatus={false}
>
  {popularMovies.length === 0
    ? // ⭐ SKELETON CAROUSEL (show 3 fake slides)
      [...Array(3)].map((_, index) => (
        <div
          key={index}
          className="relative md:h-[600px] lg:h-[550px] w-full"
        >
          {/* BACKDROP IMAGE SKELETON */}
          <Skeleton
            height={"100%"}
            className="w-full h-full object-cover"
            baseColor="#2a2a2a"
            highlightColor="#3c3c3c"
          />

          {/* TEXT AREA SKELETON – Bottom overlay same like real text */}
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-2 md:px-10 md:pb-40">
            <Skeleton
              width={250}
              height={35}
              className="mb-3"
              baseColor="#2a2a2a"
              highlightColor="#3c3c3c"
            />

            <Skeleton
              width={180}
              height={20}
              baseColor="#2a2a2a"
              highlightColor="#3c3c3c"
            />

            <Skeleton
              width={"80%"}
              height={70}
              className="mt-4 mb-10"
              baseColor="#2a2a2a"
              highlightColor="#3c3c3c"
            />
          </div>
        </div>
      ))
    : // ⭐ REAL CAROUSEL CONTENT
      popularMovies.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <div className="relative md:h-[600px] lg:h-[550px] w-full">
            {/* MOVIE IMAGE */}
            <img
              className="h-full w-full object-cover"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.original_title}
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

            {/* MOVIE INFO */}
            <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-2 md:px-10 md:pb-40">
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold">
                {movie.original_title}
              </h2>

              <p className="text-sm md:text-lg lg:text-xl font-medium opacity-90">
                Release Date: {movie.release_date} <br /> Rating:{" "}
                {movie.vote_average}⭐
              </p>

              <p className="text-xs pb-8 lg:text-lg font-normal mt-3 opacity-90 max-w-3xl">
                {movie.overview}
              </p>
            </div>
          </div>
        </Link>
      ))}
</Carousel>

        <div className="mt-8 px-4 md:px-10 max-w-7xl absolute left-1/2 transform -translate-x-1/2 w-full">
          <h3 className="text-2xl font-semibold mb-4">Popular Movies</h3>

          {popularMovies.length === 0 ? (
            // ⭐ Skeleton Loading Grid
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden bg-white/5 backdrop-blur-md"
                >
                  <Skeleton
                    height={320}
                    borderRadius={12}
                    baseColor="#2a2a2a"
                    highlightColor="#3c3c3c"
                  />
                </div>
              ))}
            </div>
          ) : (
            // ⭐ Real Movies Grid
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {popularMovies.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="bg-white/5 hover:bg-white/10 rounded-xl overflow-hidden hover:scale-110 transition-transform duration-300"
                >
                  <img
                    className="w-full h-84 object-cover border rounded-xl"
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt={movie.title || movie.original_title}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
