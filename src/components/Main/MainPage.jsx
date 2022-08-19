import Header from "../Header/Header";
import styled from "styled-components";
import SimpleMap from "./Map";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import NewCustomer from "./NewCustomer";

export default function MainPage() {
  const [address, setAddress] = useState([]);
  const { token, setToken } = useContext(UserContext);
  const [newCustomerForm, setNewCustomerForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
      console.log(token);
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setAddress(response.data);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        setToken("");
      });
  }, [token, navigate, setToken]);

  return (
    <>
      <Header />
      <StyledMainPage>
        {newCustomerForm ? (
          <NewCustomer setNewCustomerForm={setNewCustomerForm} />
        ) : (
          <></>
        )}
        <Deliverers>
          <h1>Entregadores disponíveis</h1>
        </Deliverers>
        <MapContainer>
          {address.length === 0 ? (
            <AutocompleteContainer>
              <h1>Selecione o endereço do seu estabelecimento</h1>
              <Autocomplete
                apiKey={process.env.REACT_APP_MAPS_KEY}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "40px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "0 10px",
                  marginBottom: "150px",
                }}
                options={{
                  types: ["address"],
                }}
                onPlaceSelected={(place) => {
                  const lat = place.geometry.location.lat();
                  const lng = place.geometry.location.lng();
                  axios.post(
                    `${process.env.REACT_APP_API_URL}/address`,
                    { address: `${lat} ${lng}` },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  setAddress([{ address: `${lat} ${lng}` }]);
                }}
              />
            </AutocompleteContainer>
          ) : (
            <>
              <div>
                <ion-icon name="document-sharp"></ion-icon>
                <ion-icon
                  name="person-add-sharp"
                  onClick={() => setNewCustomerForm(true)}
                ></ion-icon>
              </div>
              <SimpleMap address={address} />
            </>
          )}
        </MapContainer>
      </StyledMainPage>
    </>
  );
}

const StyledMainPage = styled.main`
  display: flex;
  height: 100%;
  background-color: #f5f5f5;
  font-family: "roboto", sans-serif;
`;

const Deliverers = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100px;
  background-color: #999999;
  h1 {
    font-size: 20px;
    font-weight: bold;
    color: #ea1d2c;
  }
`;

const MapContainer = styled.div`
  width: 75%;
  height: 100%;
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;

    ion-icon {
      font-size: 22px;
      color: #333;
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        color: #ea1d2c;
      }
    }
  }
`;

const AutocompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 135px);
  h1 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
