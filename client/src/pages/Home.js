import React, { Component } from "react";
import ReactMapGL from "react-map-gl";

class Home extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken="pk.eyJ1Ijoic3RpcGUyMTEyIiwiYSI6ImNqejRpMjk4djBkOXAzbnBhYmhqNncxaWUifQ.Dt6V1FJWMsuz80YEx0ghdg"
          onViewportChange={viewport => this.setState({ viewport })}
          mapStyle="mapbox://styles/stipe2112/cjz4im98v00zq1cn20gbvl8qp"
        />
      </div>
    );
  }
}

export default Home;

// import React, { useState, useEffect } from "react";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import * as parkDate from "./data/skateboard-parks.json";

// export default function App() {
//   const [viewport, setViewport] = useState({
//     // 43.517801,,13.75z

//     latitude: 43.4211,
//     longitude: 16.4606093,
//     //width: "100vw",
//     width: "40rem",
//     height: "40rem",
//     //height: "100vh",
//     zoom: 7.5
//   });
//   const [selectedPark, setSelectedPark] = useState(null);

//   useEffect(() => {
//     const listener = e => {
//       if (e.key === "Escape") {
//         setSelectedPark(null);
//       }
//     };
//     window.addEventListener("keydown", listener);

//     return () => {
//       window.removeEventListener("keydown", listener);
//     };
//   }, []);

//   return (
//     <div style={{ height: "40rem", width: "40rem", border: "3px solid red" }}>
//       <ReactMapGL
//         {...viewport}
//         mapboxApiAccessToken="pk.eyJ1Ijoic3RpcGUyMTEyIiwiYSI6ImNqejRpMjk4djBkOXAzbnBhYmhqNncxaWUifQ.Dt6V1FJWMsuz80YEx0ghdg"
//         //{process.env.REACT_APP_MAPBOX_TOKEN}
//         //mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
//         mapStyle="mapbox://styles/stipe2112/cjz4im98v00zq1cn20gbvl8qp"
//         onViewportChange={viewport => {
//           setViewport(viewport);
//         }}
//       >
//         {parkDate.features.map(park => (
//           <Marker
//             key={park.properties.PARK_ID}
//             latitude={park.geometry.coordinates[1]}
//             longitude={park.geometry.coordinates[0]}
//           >
//             <button
//               className="marker-btn"
//               onClick={e => {
//                 e.preventDefault();
//                 setSelectedPark(park);
//               }}
//             >
//               <img src="/skateboarding.svg" alt="Skate Park Icon" />
//             </button>
//           </Marker>
//         ))}

//         {selectedPark ? (
//           <Popup
//             latitude={selectedPark.geometry.coordinates[1]}
//             longitude={selectedPark.geometry.coordinates[0]}
//             onClose={() => {
//               setSelectedPark(null);
//             }}
//           >
//             <div>
//               <h2>{selectedPark.properties.NAME}</h2>
//               <p>{selectedPark.properties.DESCRIPTIO}</p>
//             </div>
//           </Popup>
//         ) : null}
//       </ReactMapGL>
//     </div>
//   );
// }
