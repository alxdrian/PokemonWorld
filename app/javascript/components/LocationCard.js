import styled from "@emotion/styled";

export const LocationCard = styled.div`
    display: flex;
    height: 30px;
    width: 150px;
    background-color: #e6e6e6;
    border-radius: 5px;
    padding: 5px;
    z-index: 2;
    position: absolute;
    cursor: pointer;
    ${props => props.bottom && `bottom: ${props.bottom}px`};
    ${props => props.left && `left: ${props.left}px`};

    &:hover {
        background-color: #43b2a7;
        color: #fff;
    }
`;
