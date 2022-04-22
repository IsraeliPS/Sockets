import React, { useCallback, useEffect, useRef, useState } from 'react'
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3Jha2VuZ2Fycml0IiwiYSI6ImNsMjlzeHdlYjBoOHUzam9mOG1lNjl1Y3cifQ.izPR2FeL29Qxmlf8PkW5zQ";


export const useMapbox = (puntoInicial) => {
const setRef=useCallback((node) => {
    mapaDiv.current = node;
  },[],
)

    const mapaDiv = useRef();
    const mapa=useRef()
//   const [mapa, setMapa] = useState();
    const [coords, setCoords] = useState(puntoInicial);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });

    // setMapa(map);
    mapa.current=map
  }, []);

    useEffect(() => {
        mapa.current?.on('move', () => {
            const {lng,lat}=mapa.current.getCenter();
            setCoords({
                lng:lng.toFixed(4),
                lat:lat.toFixed(4),
                zoom:mapa.current.getZoom().toFixed(2)
            })
        })   
    },[])

  return {
      coords,
      setRef
  }
}
