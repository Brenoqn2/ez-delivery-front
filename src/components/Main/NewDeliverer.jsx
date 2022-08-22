import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { FormButton, Form, Background } from "./NewCustomer";

export default function NewDeliverer(props) {
  const { token } = useContext(UserContext);
  const { setNewDelivererForm } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const setLoading = props.setLoading;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/deliverers`,
        {
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
        setNewDelivererForm(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Background onClick={() => setNewDelivererForm(false)} />
      <Form onSubmit={handleSubmit}>
        <ion-icon
          name="close-outline"
          onClick={() => setNewDelivererForm(false)}
        ></ion-icon>
        <h1>Cadastrar novo entregador</h1>
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
        <FormButton>Cadastrar</FormButton>
      </Form>
    </>
  );
}
