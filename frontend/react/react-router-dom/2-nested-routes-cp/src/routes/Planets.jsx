import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import planetsThumbnail from "../assets/planets.jpeg";
import BackButton from "../components/BackButton";

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const controller = new AbortController();

  const loadPlanets = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("https://swapi.dev/api/planets", {
        signal: controller.signal,
      });
      //beginanswer
      setPlanets(data.results);
      //endanswer
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getID = (url) => {
    const parsed = url?.split("/");
    return parsed[parsed.length - 2];
  };

  useEffect(() => {
    loadPlanets();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="page">
      <header>
        <BackButton />
        <img
          src={planetsThumbnail}
          width={40}
          height={40}
          alt="Planets Thumbnail"
        />
        <h1>Planets</h1>
      </header>

      {!loading ? (
        <div className="grid">
          {planets.length &&
            planets.map((planet, index) => (
              //beginanswer
              <Link to={`/star-wars/planets/${getID(planet.url)}`} key={index}>
                <div className="card">
                  <p>{planet.name}</p>
                </div>
              </Link>
              //endanswer
            ))}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Planets;
