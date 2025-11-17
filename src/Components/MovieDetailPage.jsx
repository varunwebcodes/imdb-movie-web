import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieDetailPage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllData();
  }, [id]);

  const API_KEY = "b08248bc4b97d37e543fca2d4705eb6b";

  const fetchAllData = async () => {
    setLoading(true);

    const [movieRes, castRes, videoRes, similarRes, recRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`),
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`),
      fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`),
      fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`),
    ]);

    const movieData = await movieRes.json();
    const castData = await castRes.json();
    const videoData = await videoRes.json();
    const similarData = await similarRes.json();
    const recData = await recRes.json();

    setMovie(movieData);
    setCast(castData.cast);
    setVideos(videoData.results);
    setSimilar(similarData.results);
    setRecommended(recData.results);

    setTimeout(() => setLoading(false), 1500);
  };

  if (loading || !movie) {
    return (
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Skeleton height={400} />
          <Skeleton height={40} className="mt-4" />
          <Skeleton height={30} count={1.5} className="mt-2" />
        </SkeletonTheme>
      </div>
    );
  }

  const trailer = videos.find((v) => v.type === "Trailer");

  return (
    <div className="pt-20 text-white">

      {/* BACKDROP */}
      <div className="relative w-full h-[60vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 mt-[-150px] relative z-10">
        <div className="flex flex-col md:flex-row gap-10">

          {/* POSTER */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-60 rounded-xl shadow-xl"
          />

          {/* TEXT */}
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="opacity-80 text-lg italic mt-2">{movie.tagline}</p>

            <p className="mt-4 opacity-90">{movie.overview}</p>

            <div className="mt-5 flex flex-wrap gap-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-lg font-bold">
                ⭐ {movie.vote_average}
              </span>
              <span>{movie.runtime} min</span>
              <span>📅 {movie.release_date}</span>
            </div>

            <div className="mt-3 flex gap-2 flex-wrap">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="border px-3 py-1 rounded-full text-sm opacity-80"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* TRAILER */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold mb-4">🎬 Official Trailer</h2>

          {trailer ? (
            <iframe
              className="w-full h-72 md:h-96 rounded-xl"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
            ></iframe>
          ) : (
            <p>No trailer available.</p>
          )}
        </div>

        {/* CAST */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold mb-4">🎭 Cast</h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
            {cast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  className="w-full h-40 object-cover rounded-lg"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/200x300"
                  }
                />
                <p className="text-sm mt-2 font-semibold">{actor.name}</p>
                <p className="text-xs opacity-60">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SIMILAR MOVIES */}
        <MovieSection title="Similar Movies" data={similar} />

        {/* RECOMMENDED MOVIES */}
        <MovieSection title="Recommended For You" data={recommended} />
      </div>
    </div>
  );
};

const MovieSection = ({ title, data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-14">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {data.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="hover:scale-110 transition-transform duration-200"
          >
            <img
              className="w-full h-84 object-cover rounded-lg border"
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailPage;
