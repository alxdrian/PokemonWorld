import styled from '@emotion/styled'

export const RegionMapContainer = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 60px);
    background-color: #43b2a7;
    justify-content: center;
    align-items: center;

    a {
        color: black;
        opacity: 0.3;
        transition: all 0.3s ease;
        font-weight: bold;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: capitalize;
        text-align: center;
        border-radius: 10px;
        background-color: #f6f6f9a1;

        p {
            opacity: 0;
        }
        
        &:hover {
            opacity: 1;
            box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);  

            p {
                opacity: 1;
            }
        }
    }

    .map-container {
        position: relative;
        height: 100%;
        
        img {
            height: 100%;
            object-fit: contain;
        }
    }

    .locations-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 10fr));
        grid-template-rows: repeat(auto-fit, minmax(50px, 10fr));
        grid-gap: 10px;
        padding: 30px;
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
        opacity: 0.7;
    }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;


export const GameContainer = styled.div`
    width: 100%;
    height: calc(100vh - 120px);
    padding: 60px;
    background: rgb(115,114,114);
    background: linear-gradient(0deg, rgba(115,114,114,1) 0%, rgba(203,203,204,1) 56%, rgba(228,228,228,1) 100%);
    z-index: 2;
    position: relative;
`;

export const GameALert = styled.div`
    top: 10px;
    left: 60px;
    width: 400px;
    height: 40px;
    background-color: #df7553;
    border-radius: 5px;
    position: absolute;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #fff;
`;

export const GameModal = styled.div`
    width: calc(100% - 120px);
    height: calc(100% - 120px);
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    top: 60px;
    left: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
`;