import styled from '@emotion/styled';

export const NavBar = styled.nav`
  height: 60px;
  width: 100%;
  background-color: #43b2a7;

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;

    li {
        list-style: none;
        height: 100%;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;

        &:hover {
            cursor: pointer;
            background-color: #e6e6e6;
            color: #43b2a7;
        }   
    }
  }
`