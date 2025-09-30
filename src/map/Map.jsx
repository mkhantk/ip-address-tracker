import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Map({ location, error }) {
  // keep one map instance, then change the content based on the parameter,
  // better to use useref then state in this case.
  // and better then two different map instance .

  useEffect(() => {
    // console.log(location);

    const map =
      !error && location
        ? L.map("map").setView(location, 13)
        : L.map("map").fitWorld();

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    const myIcon = L.icon({
      iconUrl: ".././icon-location.svg",
      iconSize: [30, 60],
      iconAnchor: [22, 94],
      shadowAnchor: [22, 94],
    });

    if (!error && location) {
      L.marker(location, { icon: myIcon }).addTo(map);
    }

    return () => {
      map.remove();
    };
  }, [location, error]);

  return <div id="map" className="grow z-10"></div>;
}

export default Map;
