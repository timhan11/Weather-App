import React, { useState } from "react";
import axios from "axios";
import beach from "../assets/beachpic.png";
import cold from "../assets/coldpic.png";
import rain from "../assets/rainpic.png";
import rainfall from "../assets/rainfall.png";
import visibility from "../assets/visibility.png";
import wind from "../assets/wind.png";
import cloud from "../assets/cloud.png";
import clear from "../assets/clear.png";
import mist from "../assets/mist.png"

const WeatherComponent = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${
    import.meta.env.VITE_KEY
  }`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
      setLocation("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <div className="w-full max-w-xs p-4 mt-2">
        <input
          type="text"
          className="input input-bordered input-secondary w-full p-4 rounded-lg"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data.name && (
        <h1 className="text-xl font-bold mt-4">Weather in {data.name}</h1>
      )}

      {Object.keys(data).length > 0 && data.weather && data.weather.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mt-4 hover:scale-105 transition-transform duration-300">
          <div className="card w-80 md:w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={data.main.temp > 60 ? beach : cold}
                alt="Temperature"
                className="rounded-xl h-40 w-auto"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{data.main.temp.toFixed()}°F</h2>
            </div>
          </div>

          <div className="card w-80 md:w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={data.weather[0].main.toLowerCase().includes('rain') ? rain : 
                    data.weather[0].main.toLowerCase().includes('mist') ? mist :
                      data.weather[0].main.toLowerCase().includes('clouds') ? cloud : 
                      data.weather[0].main.toLowerCase().includes('clear') ? clear : clear}
                alt="Weather"
                className="rounded-xl h-40 w-auto"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{data.weather[0].main}</h2>
            </div>
          </div>

          <div className="card w-80 md:w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={wind}
                alt="Wind"
                className="rounded-xl h-40 w-auto"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Wind Speed: {data.wind.speed} mph</h2>
            </div>
          </div>

          <div className="card w-80 md:w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={visibility}
                alt="Visibility"
                className="rounded-xl h-40 w-auto"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Visibility: {data.visibility} meters</h2>
            </div>
          </div>

          <div className="card w-80 md:w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={rainfall}
                alt="Rainfall"
                className="rounded-xl h-40 w-auto"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Rainfall (1h): {data.rain?.["1h"] !== undefined ? `${data.rain["1h"]} mm` : "None"}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
