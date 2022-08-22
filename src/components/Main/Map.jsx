import React from "react";
import GoogleMapReact from "google-map-react";

export default function SimpleMap(props) {
  const orders = props.orders;
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

  const CustomerIcon = () => (
    <div
      style={{
        color: "white",
        fontSize: "10px",
        background: "rgb(234, 29, 44, 0.8)",
        padding: "6px 6px",
        display: "inline-flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "100%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ion-icon
        style={{ color: "white", marginLeft: "5px" }}
        name="receipt-outline"
      ></ion-icon>
    </div>
  );

  return (
    <div style={{ height: "calc(100vh - 180px)", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.REACT_APP_MAPS_KEY}` }}
        defaultCenter={center}
        defaultZoom={15}
      >
        <EstablishmentIcon
          lat={center.lat}
          lng={center.lng}
          text="Establishment"
        />

        {orders.map((order) => {
          const lat = Number(order.address.split(" ")[0]);
          const lng = Number(order.address.split(" ")[1]);
          return <CustomerIcon key={order.id} lat={lat} lng={lng} />;
        })}
      </GoogleMapReact>
    </div>
  );
}
