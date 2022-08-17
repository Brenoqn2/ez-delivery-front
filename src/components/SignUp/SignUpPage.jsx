import Header from "../Header/Header";
import { Form, Input, FormButton, FormLink } from "../Login/LoginPage";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/sign-up`, {
        email,
        password,
        name,
      })
      .then((response) => {
        console.log(response);
        navigate("/sign-in");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <StyledSignUpPage>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <FormButton>Cadastrar</FormButton>
          <FormLink onClick={() => navigate("/sign-in")}>
            Já tem uma conta? Entre!
          </FormLink>
        </Form>
      </StyledSignUpPage>
    </>
  );
}

const StyledSignUpPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f5f5f5;
  font-family: "roboto", sans-serif;
`;
