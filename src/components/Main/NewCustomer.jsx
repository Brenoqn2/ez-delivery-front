import styled from "styled-components";
import Autocomplete from "react-google-autocomplete";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function NewCustomer(props) {
  const { token } = useContext(UserContext);
  const { setNewCustomerForm } = props;
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const setLoading = props.setLoading;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/customers`,
        {
          address,
          name,
          email,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setNewCustomerForm(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Background onClick={() => setNewCustomerForm(false)} />
      <Form onSubmit={handleSubmit}>
        <ion-icon
          name="close-outline"
          onClick={() => setNewCustomerForm(false)}
        ></ion-icon>
        <h1>Cadastrar novo cliente</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
        ></input>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefone"
          required
        ></input>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        ></input>
        <Autocomplete
          apiKey={process.env.REACT_APP_MAPS_KEY}
          required
          style={{
            width: "90%",
            height: "40px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            padding: "0 10px",
            marginBottom: "10px",
          }}
          options={{
            types: ["address"],
          }}
          onPlaceSelected={(place) => {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setAddress(`${lat} ${lng}`);
          }}
        />
        <FormButton>Cadastrar</FormButton>
      </Form>
    </>
  );
}

export const Background = styled.div`
  background-color: rgb(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60vw;
  height: 60vh;
  background-color: #f5f5f5;
  position: fixed;
  min-width: 200px;
  top: calc(50% - 30vh);
  left: calc(50% - 30vw);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  z-index: 2;
  h1 {
    margin-bottom: 30px;
    font-weight: bold;
  }
  input {
    width: 90%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 0 10px;
    margin-bottom: 10px;
  }

  ion-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #333;
    font-size: 20px;
    &:hover {
      color: #ea1d2c;
    }
  }
`;

export const FormButton = styled.button`
  width: 50%;
  max-width: 500px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  margin-top: 20px;
  background-color: #ea1d2c;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #d20b15;
  }
`;
