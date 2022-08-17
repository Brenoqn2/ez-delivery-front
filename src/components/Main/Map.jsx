import React from "react";
import GoogleMapReact from "google-map-react";

export default function SimpleMap(props) {
  let center = props.address[0].address;
  center = {
    lat: Number(center.split(" ")[0]),
    lng: Number(center.split(" ")[1]),
  };

  const EstablishmentIcon = ({ text }) => (
    <div
      style={{
        color: "white",
        background: "rgb(234, 29, 44, 0.8)",
        padding: "15px 10px",
        display: "inline-flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "100%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {text}
    </div>
  );

  return (
    <div style={{ height: "calc(100vh - 135px)", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_MAPS_KEY}` }}
        defaultCenter={center}
        defaultZoom={16}
      >
        <EstablishmentIcon
          lat={center.lat}
          lng={center.lng}
          text="Establishment"
        />
      </GoogleMapReact>
    </div>
  );
}
