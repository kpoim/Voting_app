import styled from 'styled-components';

export const Section = styled.div`
    border-right: 2px solid black;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;

    > * {
        margin: 10px auto;
        width: 85%;
    }
`;