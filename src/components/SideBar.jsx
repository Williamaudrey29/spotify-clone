import styled from "styled-components";

const Container = styled.div`
/* grid-column: 1/span 2; */
max-width: 240px;
  width: 100%;
  height: 100%;
  background-color: black;
  color: white;
  position: fixed;
  padding: 25px 10px;
`;
const ImageLogo = styled.img`
  width: 143px;
  object-fit: cover;
  padding-left: 15px;
  margin-bottom: 25px;
`;
const SideBarOption = styled.li`
  height: 40px;
  padding-left: 15px;
  color: #dfdfdf;
  ion-icon {
    font-size: 25px;
  }
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 15px;
  cursor: pointer;
  transition: color 0.25s;
  &:hover {
    color: white;
  }
`;
const SideBar = () => {
  return (
    <Container>
      <ImageLogo alt="" srcSet="logo.png 2x" />
      <ul>
        <SideBarOption>
          <ion-icon name="home" className="option_icon"></ion-icon>
          <span>Trang chủ</span>
        </SideBarOption>
        <SideBarOption>
          <ion-icon name="search" className="option_icon"></ion-icon>
          <span>Tìm kiếm</span>
        </SideBarOption>
      </ul>
    </Container>
  );
};

export default SideBar;
