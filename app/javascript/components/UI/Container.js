import styled from '@emotion/styled'

export const RegionMapContainer = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 60px);
    background-color: #43b2a7;
    justify-content: center;
    align-items: center;

    .map {
        position: relative;
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
`;

export const AreaMapContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #6fc79f;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 40px;
    padding: 20px;

    .tail-grass {
        height: 20%;
        width: 40%;
        background-image: url('https://tiermaker.com/images/chart/chart/pokemon-tall-grass-overworld-textures-363297/frlgpng.png');
        background-size: 20px 20px;
        background-repeat: repeat space;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }
`;


export const GameContainer = styled.div`
    width: 100%;
    height: calc(100vh - 120px);
    padding: 60px;
    background: rgb(115,114,114);
    background: linear-gradient(0deg, rgba(115,114,114,1) 0%, rgba(203,203,204,1) 56%, rgba(228,228,228,1) 100%);
    z-index: 2;
`;