import styled from "@emotion/styled";

export const Trainer = styled.div`
    width: 64px;
    height: 64px;
    position: absolute;
    top: calc(50% - ${props => props.top}px);
    left: calc(50% - ${props => props.left}px);
    ${props => props.direction && `transform: rotate(${props.direction}deg)`};
   
    img {
        width: 64px;
        height: 64px;
        object-fit: contain;
    }
`;
