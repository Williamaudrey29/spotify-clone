import styled from "styled-components";
import SideBar from "./SideBar";
import HomePage from "../pages/HomePage";

const BodyContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 240px calc(100% - 240px);
  grid-row: auto;
`;

const Body = () => {
  return (
    <BodyContainer>
        <div style={{gridColumn: "1/2"}}><SideBar></SideBar></div>
        <div style={{gridColumn: "2/3"}}><HomePage></HomePage></div>
    </BodyContainer>
  );
};

export default Body;
