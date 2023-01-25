import styled from 'styled-components';
import Section from '../Section';

export const Container1 = styled.div`
    display: flex;
    height: 80vh;
    width: 100vw;
    border-top: 2px solid black;

    &:last-child {
        border-right: unset;
    }
`;

export const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 5fr;
    grid-template-columns: 2fr 2fr 3fr;
    height: 100vh;

    header {
        grid-column-start: 1;
        grid-column-end: 4;
        border-bottom: 2px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    ${Section}:last-child {
        border: none;
    }
`;
