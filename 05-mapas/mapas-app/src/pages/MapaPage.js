import React from "react";

import { useMapbox } from "../hooks/useMapbox";



const puntoInicial = { lng: 262.63, lat: 19.83, zoom: 12 };

export const MapaPage = () => {
  const{coords, setRef}=useMapbox(puntoInicial)
  return (

    <>
      <div className="info">
          Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer"></div>
    </>
  );
};
