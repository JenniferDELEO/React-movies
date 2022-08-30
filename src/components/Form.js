import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [moviesDataSearch, setMoviesDataSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [sortGoodBad, setSortGoodBad] = useState(null);

  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=ffb1dd228004fdbe215b8122ba4bfbd6&query=${search}&language=fr-FR`
    )
    .then((res) => setMoviesDataSearch(res.data.results));

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=ffb1dd228004fdbe215b8122ba4bfbd6&sort_by=popularity.desc`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [search]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Rechercher" />
        </form>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Top<span>➜</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            Flop<span>➜</span>
          </div>
        </div>
      </div>
      <div className="result">
        {moviesDataSearch.length !== 0
          ? moviesDataSearch
              .slice(0, 12)
              .sort((a, b) => {
                if (sortGoodBad === "goodToBad") {
                  return b.vote_average - a.vote_average;
                } else if (sortGoodBad === "badToGood") {
                  return a.vote_average - b.vote_average;
                }
              })
              .map((movie) => <Card key={movie.id} movie={movie} />)
          : moviesData
              .slice(0, 12)
              .sort((a, b) => {
                if (sortGoodBad === "goodToBad") {
                  return b.vote_average - a.vote_average;
                } else if (sortGoodBad === "badToGood") {
                  return a.vote_average - b.vote_average;
                }
              })
              .map((movie) => <Card key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Form;
