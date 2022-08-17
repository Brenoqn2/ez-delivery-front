import styled from "styled-components";
import Header from "../Header/Header";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/sign-in`, {
        email,
        password,
      })
      .then((response) => {
        setToken(response.data.token);
        navigate("/main");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token) {
      navigate("/main");
    }
  }, [navigate, token]);

  return (
    <>
      <Header />
      <StyledLoginPage>
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
          <FormButton>Entrar</FormButton>
          <FormLink onClick={() => navigate("/sign-up")}>
            Ainda não tem uma conta? Registre-se!
          </FormLink>
        </Form>
      </StyledLoginPage>
    </>
  );
}

const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f5f5f5;
  font-family: "roboto", sans-serif;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 100%;
  background-color: #f5f5f5;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 500px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  margin-bottom: 10px;
`;

export const FormButton = styled.button`
  width: 100%;
  max-width: 500px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  margin-bottom: 10px;
  background-color: #ea1d2c;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #d20b15;
  }
`;

export const FormLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #ea1d2c;
  }
`;
