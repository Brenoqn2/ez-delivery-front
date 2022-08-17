import styled from "styled-components";
import Header from "../Header/Header";

export default function LoginPage() {
  return (
    <>
      <Header />
      <StyledLoginPage>
        <LoginForm />
      </StyledLoginPage>
    </>
  );
}

const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`;
