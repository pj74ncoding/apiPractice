import { useState, useEffect, useMemo } from "react";

import "./App.css";

function App() {
  // const imageToTry = useMemo(
  //   () => backupTvData[4]?.backdrop_path,
  //   [backupTvData],
  // );

  // const movieImage = useMemo(() => movieData[4]?.backdrop_path, [movieData]);
  // useEffect(() => {
  //   console.log("imageToTryBitches", imageToTry);
  // }, [imageToTry]);

  // const tvObjectZero = useMemo(() => tvData[0], [tvData]);
  // const tvObjectOne = useMemo(() => tvData[1], [tvData]);
  // const tvObjectTwo = useMemo(() => tvData[2], [tvData]);
  // const tvObjectThree = useMemo(() => tvData[3], [tvData]);
  // const tvObjectFour = useMemo(() => tvData[4], [tvData]);

  // const movieObjectZero = useMemo(() => movieData[0], [movieData]);
  // const movieDataOne = useMemo(() => movieData[1], [movieData]);
  // const movieDataTwo = useMemo(() => movieData[1], [movieData]);
  // const movieDataThree = useMemo(() => movieData[1], [movieData]);
  // const movieDataFour = useMemo(() => movieData[1], [movieData]);

  // const filteredEven = useMemo(() => {
  //   const EvenMixedArray = mixedArray.slice();
  //   return EvenMixedArray.filter((_, index) => index % 2 == 0);
  // }, [mixedArray]);

  // const filteredOdd = useMemo(() => {
  //   const oddMixedArray = mixedArray.slice();
  //   return oddMixedArray.filter((_, index) => index % 2 != 0);
  // }, [mixedArray]);

  // useEffect(() => {
  //   console.log(backupMovieData, "backupMovieData");
  //   console.log(slicedMovie, "slicedMovie");
  //   console.log(slicedTv, "slicedTv");

  //   console.log(backupMovieData[8]?.title || "unKnown", "backupMovieData");
  //   console.log(backupMovieData[8]?.poster_path || "unknown", "poster_path");
  // }, [backupTvData, backupMovieData, mixedArray]);

  const [movieData, setmovieData] = useState([]);
  const [tvData, setTvData] = useState([]);
  const [backupMovieData, setBackupMovieData] = useState([]);
  const [backupTvData, setBackupTvData] = useState([]);
  const [mixedArray, setMixedArray] = useState([]);
  const [newMixedArray, setNewMixedArray] = useState([]);
  const [mixedMovieAndTv, setMixedMovieAndTv] = useState([]);

  const testsMovieFetch = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=5a1dbe02eaed7aed89976013dcbc8aef",
    );
    const result = await response.json();
    setmovieData(result.results);
    setBackupMovieData(result.results);
  };

  const testsTvFetch = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=5a1dbe02eaed7aed89976013dcbc8aef",
    );
    const result = await response.json();
    setTvData(result.results);
    setBackupTvData(result.results);
  };

  useEffect(() => {
    testsMovieFetch();
    testsTvFetch();
  }, []);

  const slicedMovie = useMemo(
    () => backupMovieData.slice(0, 5),
    [backupMovieData],
  );
  const slicedTv = useMemo(() => backupTvData.slice(0, 5), [backupTvData]);

  useEffect(() => {
    setMixedArray([...slicedMovie, ...slicedTv]);
  }, [slicedMovie, slicedTv]);
  useEffect(() => {
    console.log("mixedArray", mixedArray);
  }, [mixedArray]);

  const flatMapMixedArray = useMemo(() => {
    const tests = mixedArray.slice();
    return tests
      .slice(0, tests.length / 2)
      .flatMap((x, i) => [x, tests[i + tests.length / 2]]);
  }, [mixedArray]);

  useEffect(() => {
    if (flatMapMixedArray.length == 10) {
      setMixedMovieAndTv([...flatMapMixedArray]);
    }
  }, [flatMapMixedArray]);

  useEffect(() => {
    console.log("flatMapMixedArray", flatMapMixedArray);
  }, [flatMapMixedArray]);

  useEffect(() => {
    console.log(mixedMovieAndTv, "mixedMovieAndTv");
  }, [mixedMovieAndTv]);

  return (
    <>
      <br />
      <br />
      {/* --------------------------------------- */}
      <section className="home-hero-section">
        <div className="home-top-border"></div>
        <div className="home-hero-heading">
          <img src="foxhead.png" alt="An illustration of a fox head" />
          <div className="heading">
            <h1>Fox74MediaHub</h1>
            <p>- The Best Viewing Content All In One Place! -</p>
          </div>
        </div>

        <section className="media-row-one">
          {mixedMovieAndTv.slice(0, 5).map((show) => {
            const mediaType = show.media_type;
            return mediaType == "movie" ? (
              <section key={show.id} className="home-media-movie-container">
                <div className="home-media-movie-screen">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                    alt="a poster"
                  />
                </div>

                <div className="home-media-movie-title">
                  <div className="title">
                    <p className="ticker-text">Movie: {show.title}</p>
                  </div>
                </div>
              </section>
            ) : (
              <section key={show.id} className="home-media-tv-container">
                <div className="home-media-tv">
                  <div className="home-media-tv-screen">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                      alt="a poster"
                    />
                  </div>

                  <div className="home-media-tv-controls">
                    <div className="home-media-tv-buttons"></div>
                    <div className="home-media-tv-buttons"></div>
                    <div className="home-media-tv-buttons"></div>
                    <div className="home-media-tv-buttons"></div>
                    <div className="home-media-tv-blankplate">
                      <div className="home-media-tv-vent"></div>
                      <div className="home-media-tv-vent"></div>
                      <div className="home-media-tv-vent"></div>
                      <div className="home-media-tv-vent"></div>
                    </div>
                  </div>
                </div>
                <div className="home-media-title">
                  <div className="title">
                    <p className="ticker-text">TV Series: {show.name} </p>
                  </div>
                </div>
              </section>
            );
          })}
          {/* {mixedMovieAndTv.slice(0, 5).map((show) => {
            return (
              <section key={show.id} className="home-media-movie-container">
                <div className="home-media-movie-screen">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                    alt="a poster"
                  />
                </div>

                <div className="home-media-movie-title">
                  <div className="title">
                    <p className="ticker-text">Movie: {show.title}</p>
                  </div>
                </div>
                <p>{show.media_type}</p>
              </section>
            );
          })} */}
          {/* <section className="home-media-tv-container">
            <div className="home-media-tv">
              <div className="home-media-tv-screen">
                <img
                  src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                  alt="a poster"
                />
              </div>

              <div className="home-media-tv-controls">
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-blankplate">
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                </div>
              </div>
            </div>
            <div className="home-media-title">
              <div className="title">
                <span className="ticker-text">Spiderman Homecoming </span >
              </div>
            </div>
          </section>{" "}
          <section className="home-media-movie-container">
            <div className="home-media-movie-screen">
              <img
                className="pete"
                src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                alt="a poster"
              />
            </div>

            <div className="home-media-movie-title">
              <div className="title">
                <span className="ticker-text">Reacher</span>
              </div>
            </div>
          </section>
          <section className="home-media-tv-container">
            <div className="home-media-tv">
              <div className="home-media-tv-screen">
                <img
                  src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                  alt="a poster"
                />
              </div>

              <div className="home-media-tv-controls">
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-blankplate">
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                </div>
              </div>
            </div>
            <div className="home-media-title">
              <div className="title">
                <p>Spiderman Homecoming </p>
              </div>
            </div>
          </section>{" "}
          <section className="home-media-movie-container">
            <div className="home-media-movie-screen">
              <img
                className="pete"
                src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                alt="a poster"
              />
            </div>

            <div className="home-media-movie-title">
              <div className="title">
                <p>Reacher</p>
              </div>
            </div>
          </section>
          <section className="home-media-tv-container">
            <div className="home-media-tv">
              <div className="home-media-tv-screen">
                <img
                  src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                  alt="a poster"
                />
              </div>

              <div className="home-media-tv-controls">
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-blankplate">
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                </div>
              </div>
            </div>
            <div className="home-media-title">
              <div className="title">
                <p>Last </p>
              </div>
            </div>
          </section>{" "} */}
        </section>

        {/* ------------------------------------------------------------- */}

        <div className="media-row-two">
          {mixedMovieAndTv.slice(-5).map((show) => {
            const mediaType = show.media_type;
            return mediaType == "movie" ? (
              <section key={show.id} className="home-media-movie-container">
                <div className="home-media-movie-screen">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                    alt="a poster"
                  />
                </div>

                <div className="home-media-movie-title">
                  <div className="title">
                    <p className="ticker-text">Movie: {show.title}</p>
                  </div>
                </div>
              </section>
            ) : (
              <section key={show.id} className="home-media-tv-container">
                <div className="home-media-tv">
                  <div className="home-media-tv-screen">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
                      alt="a poster"
                    />
                  </div>

                  <div className="home-media-tv-controls">
                    <div className="home-media-tv-buttons"></div>
                    <div className="home-media-tv-buttons"></div>
                    <div className="home-media-tv-buttons"></div>
                    <div className="home-media-tv-buttons"></div>
                    <div className="home-media-tv-blankplate">
                      <div className="home-media-tv-vent"></div>
                      <div className="home-media-tv-vent"></div>
                      <div className="home-media-tv-vent"></div>
                      <div className="home-media-tv-vent"></div>
                    </div>
                  </div>
                </div>
                <div className="home-media-title">
                  <div className="title">
                    <p className="ticker-text">TV Series: {show.name} </p>
                  </div>
                </div>
              </section>
            );
          })}
          {/* <section className="home-media-movie-container">
            <div className="home-media-movie-screen">
              <img
                className="pete"
                src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                alt="a poster"
              />
            </div>

            <div className="home-media-movie-title">
              <div className="title">
                <p>Reacher</p>
              </div>
            </div>
          </section>
          <section className="home-media-tv-container">
            <div className="home-media-tv">
              <div className="home-media-tv-screen">
                <img
                  src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                  alt="a poster"
                />
              </div>

              <div className="home-media-tv-controls">
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-blankplate">
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                </div>
              </div>
            </div>
            <div className="home-media-title">
              <div className="title">
                <p>Spiderman Homecoming </p>
              </div>
            </div>
          </section>{" "}
          <section className="home-media-movie-container">
            <div className="home-media-movie-screen">
              <img
                className="pete"
                src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                alt="a poster"
              />
            </div>

            <div className="home-media-movie-title">
              <div className="title">
                <p>Reacher</p>
              </div>
            </div>
          </section>{" "}
          <section className="home-media-tv-container">
            <div className="home-media-tv">
              <div className="home-media-tv-screen">
                <img
                  src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                  alt="a poster"
                />
              </div>

              <div className="home-media-tv-controls">
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-blankplate">
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                </div>
              </div>
            </div>
            <div className="home-media-title">
              <div className="title">
                <p>Spiderman Homecoming </p>
              </div>
            </div>
          </section>{" "}
          <section className="home-media-movie-container">
            <div className="home-media-movie-screen">
              <img
                className="pete"
                src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                alt="a poster"
              />
            </div>

            <div className="home-media-movie-title">
              <div className="title">
                <p>Reacher</p>
              </div>
            </div>
          </section>
        </div>
        <div className="home-first-bottom"></div>
        <div className="home-bottom-border"></div>
      </section>

      <br />
      <br />
      <section className="home-hero-section">
        <div className="home-top-border"></div>
        <div className="home-hero-heading">
          <img src="foxhead.png" alt="An illustration of a fox head" />
          <div className="heading">
            <h1>Fox74MediaHub</h1>
            <p>- The Best Viewing Content All In One Place! -</p>
          </div>
        </div>
        <div className="media-row-one">
          <section className="home-media-tv-container">
            <div className="home-media-tv">
              <div className="home-media-tv-screen">
                <img
                  src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                  alt="a poster"
                />
              </div>

              <div className="home-media-tv-controls">
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-blankplate">
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                </div>
              </div>
            </div>
            <div className="home-media-title">
              <div className="title">
                <p>Spiderman Homecoming </p>
              </div>
            </div>
          </section>{" "}
          <section className="home-media-tv-container">
            <div className="home-media-tv">
              <div className="home-media-tv-screen">
                <img
                  src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                  alt="a poster"
                />
              </div>

              <div className="home-media-tv-controls">
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-blankplate">
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                </div>
              </div>
            </div>
            <div className="home-media-title">
              <div className="title">
                <p>Spiderman Homecoming </p>
              </div>
            </div>
          </section>{" "}
          <section className="home-media-tv-container">
            <div className="home-media-tv">
              <div className="home-media-tv-screen">
                <img
                  src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                  alt="a poster"
                />
              </div>

              <div className="home-media-tv-controls">
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-blankplate">
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                </div>
              </div>
            </div>
            <div className="home-media-title">
              <div className="title">
                <p>Spiderman Homecoming </p>
              </div>
            </div>
          </section>{" "}
          <section className="home-media-tv-container">
            <div className="home-media-tv">
              <div className="home-media-tv-screen">
                <img
                  src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                  alt="a poster"
                />
              </div>

              <div className="home-media-tv-controls">
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-blankplate">
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                </div>
              </div>
            </div>
            <div className="home-media-title">
              <div className="title">
                <p>Spiderman Homecoming </p>
              </div>
            </div>
          </section>{" "}
          <section className="home-media-tv-container">
            <div className="home-media-tv">
              <div className="home-media-tv-screen">
                <img
                  src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                  alt="a poster"
                />
              </div>

              <div className="home-media-tv-controls">
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-buttons"></div>
                <div className="home-media-tv-blankplate">
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                  <div className="home-media-tv-vent"></div>
                </div>
              </div>
            </div>
            <div className="home-media-title">
              <div className="title">
                <p>Spiderman Homecoming </p>
              </div>
            </div>
          </section>{" "}
        </div>

        <div className="media-row-two">
          <section className="home-media-movie-container">
            <div className="home-media-movie-screen">
              <img
                className="pete"
                src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                alt="a poster"
              />
            </div>

            <div className="home-media-movie-title">
              <div className="title">
                <p>Reacher</p>
              </div>
            </div>
          </section>
          <section className="home-media-movie-container">
            <div className="home-media-movie-screen">
              <img
                className="pete"
                src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                alt="a poster"
              />
            </div>

            <div className="home-media-movie-title">
              <div className="title">
                <p>Reacher</p>
              </div>
            </div>
          </section>{" "}
          <section className="home-media-movie-container">
            <div className="home-media-movie-screen">
              <img
                className="pete"
                src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                alt="a poster"
              />
            </div>

            <div className="home-media-movie-title">
              <div className="title">
                <p>Reacher</p>
              </div>
            </div>
          </section>{" "}
          <section className="home-media-movie-container">
            <div className="home-media-movie-screen">
              <img
                className="pete"
                src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                alt="a poster"
              />
            </div>

            <div className="home-media-movie-title">
              <div className="title">
                <p>Reacher</p>
              </div>
            </div>
          </section>{" "}
          <section className="home-media-movie-container">
            <div className="home-media-movie-screen">
              <img
                className="pete"
                src={`https://image.tmdb.org/t/p/w500${imageToTry}`}
                alt="a poster"
              />
            </div>

            <div className="home-media-movie-title">
              <div className="title">
                <p>Reacher</p>
              </div>
            </div>
          </section> */}
        </div>
        <div className="home-first-bottom"></div>
        <div className="home-bottom-border"></div>
      </section>
      {/* ============================================================================ */}
      {/* ========================================================================== */}
      {/* ======================================================================== */}

      {mixedArray.map((program) => {
        const mediaType = program.media_type;
        return (
          <div key={program.id}>
            <p>{program.id}</p>
            <p>{mediaType == "movie" ? program.title : program.name}</p>
          </div>
        );
      })}
      {/* <p>tvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv</p>
      {tvData.map((program) => (
        <div key={program.id}>
          <p>{program.id}</p>
          <p>{program.title}</p>
          <div>
            <a href={`https://api.themoviedb.org/3/tv/${program.id}/videos`}>
              movievid
            </a>
          </div>
        </div>
      ))} */}
      <div
        className="div"
        style={{
          height: "200px",
          width: "200px",
          border: "1px solid blue",
          margin: "auto",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="inner"
          style={{
            height: "100px",
            width: " 400%",
            border: "1px solid red",
            position: "absolute",
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
