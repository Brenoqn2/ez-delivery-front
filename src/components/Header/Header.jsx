import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <Logo>
        <p>EZ</p>
        <p>delivery</p>
      </Logo>
      <Navigation>
        <NavItem>
          <NavLink onClick={() => navigate("/")}>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => navigate("/about")}>Sobre</NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={() => navigate("/sign-up")}>Criar conta</NavLink>
        </NavItem>
        <NavItem>
          <Button onClick={() => navigate("/sign-in")}>Entrar</Button>
        </NavItem>
      </Navigation>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  background-color: white;
  height: 135px;
  font-family: "Roboto", sans-serif;
`;

const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #ea1d2c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
  width: 100%;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  cursor: pointer;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  &:hover {
    color: #ea1d2c;
  }
`;

const Button = styled.button`
  background-color: #ea1d2c;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #d20b15;
  }
`;
