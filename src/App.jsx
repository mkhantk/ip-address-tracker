import { useEffect, useRef, useState } from "react";

import "./App.css";
import Map from "./map/Map";
import axios from "axios";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const ipref = useRef("");

  const fetchIpData = async (ip) => {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`;
    try {
      const response = await axios.get(url);
      setData(response.data);
      setError(false);
    } catch {
      setError(true);
      setData(null);
    }
  };
  useEffect(() => {
    fetchIpData("");
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="bg-[url('./pattern-bg-mobile.png')] md:bg-[url('./pattern-bg-desktop.png')] bg-cover bg-center h-64 z-50">
        <h1 className="text-white text-2xl text-center font-bold py-5 lg:text-3xl">
          IP Address Tracker
        </h1>
        <div className="w-4/5 m-auto relative mb-8 lg:my-5 lg:w-1/3">
          <input
            ref={ipref}
            type="text"
            accept="/[0-9]/"
            placeholder="search for any IP address or domain"
            className="px-2 py-2 bg-white w-full text-lg rounded-lg outline-none placeholder:text-xs lg:px-5 lg:py-3 lg:placeholder:text-lg lg:text-xl"
          />
          <button
            className="absolute right-0 bottom-0 top-0 aspect-square bg-black flex justify-center items-center rounded-r-lg cursor-pointer hover:bg-black/50"
            onClick={() => fetchIpData(ipref.current.value)}
          >
            <img src="/icon-arrow.svg" alt="" />
          </button>
        </div>
        <div className="grid grid-cols-1 justify-center items-start gap-3 w-4/5 m-auto -mb-40 bg-white p-5 rounded-lg shadow-lg z-40 lg:grid-cols-4 lg:mt-12 lg:text-xl">
          <div>
            <h3 className="text-xs font-bold text-gray-400 text-center lg:text-base">
              IP ADDRESS
            </h3>
            <span className="inline-block w-full my-3 text-center text-2xl text-gray-900 ">
              {data ? data.ip : "Not Available"}
            </span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 text-center lg:text-base">
              LOCATION
            </h3>
            <span className="inline-block w-full my-3 text-center text-2xl text-gray-900 ">
              {data && data.location.city
                ? data.location.city +
                  ", " +
                  data.location.region +
                  " " +
                  data.location.postalCode
                : "Not Available"}
            </span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 text-center lg:text-base">
              TIMEZONE
            </h3>
            <span className="inline-block w-full my-3 text-center text-2xl text-gray-900 ">
              {data && data.location.timezone
                ? "UTC " + data.location.timezone
                : "Not Available"}
            </span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 text-center lg:text-base">
              ISP
            </h3>
            <span className="inline-block w-full my-3 text-center text-2xl text-gray-900 ">
              {data && data.isp ? data.isp : "Not Available"}
            </span>
          </div>
        </div>
      </div>
      <Map
        location={data && [data.location.lat, data.location.lng]}
        error={error}
      />
    </div>
  );
}

export default App;
