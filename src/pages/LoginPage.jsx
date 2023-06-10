import styled from "styled-components";
import { URL } from "../Spotify";
import { useContext } from "react";
import { DataContext } from "../context/context";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: black;
`;
const Logo = styled.img`
  width: 40%;
  object-fit: cover;
`;
const LoginBtn = styled.a`
  padding: 20px 10px;
  background-color: green;
  border-radius: 50px;
  font-size: 30px;
  font-weight: 500;
  color: white;
  text-decoration: none;
`;
const LoginPage = () => {
  return (
    <Container>
      <Logo src="/logo.png" />
      <LoginBtn href={URL}>LOGIN WITH SPOTIFY</LoginBtn>
    </Container>
  );
};

export default LoginPage;
