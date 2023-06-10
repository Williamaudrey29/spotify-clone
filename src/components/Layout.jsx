import Body from "./Body";
import Footer from "./Footer";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1440px;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Layout = () => {
  return (
    <Wrapper>
      <Body></Body>
      <Footer></Footer>
    </Wrapper>
  );
};

export default Layout;
