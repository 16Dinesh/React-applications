import { Fragment, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import './App.css';

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  // Hyderabad marker
  const marker = {
    id: 1,
    name: "Hyderabad, Telangana, India",
    position: { lat: 17.385044, lng: 78.486671 },
  };

  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center">Google-Maps-marker | Hyderabad </h1>
        <div className="map-container">
          {isLoaded ? (
            <GoogleMap
              center={marker.position}
              zoom={12}
              onClick={() => setActiveMarker(null)}
              mapContainerClassName="map-style"
            >
              <MarkerF
                key={marker.id}
                position={marker.position}
                onClick={() => handleActiveMarker(marker.id)}
                icon={{
                  url: "https://cdn-icons-png.flaticon.com/512/149/149060.png", 
                  scaledSize: { width: 50, height: 50 },
                }}
              >
                {activeMarker === marker.id ? (
                  <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                    <div className="info-window">
                      <h3>{marker.name}</h3>
                      <p>Beautiful city known for its history and culture.</p>
                    </div>
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            </GoogleMap>
          ) : (
            <p>Loading map...</p>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
