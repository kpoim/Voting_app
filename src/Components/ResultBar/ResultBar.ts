import styled from 'styled-components';
import { Options } from '../../App';

interface ResultBarProps {
    option: Options[0];
    index: number;
    highestVoteCount: number;
}

export const ResultBar = styled.div<ResultBarProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: ${({option, highestVoteCount}) => (option[1] / (highestVoteCount || 1)) * 100}%;
    flex: 1;
    border: 1px solid #1d5b0d;
    border-bottom: none;
    border-left-width: ${({index}) => index ? '1px' : '0'};
    transition: 200ms;
    max-width: 33%;
    position: relative;
    left: ${({index}) => `-${index}px`};

    :hover, &.highlight {
        background-color: #1d5b0d;
    }

    > span {
        position: relative;

        :first-child {
            top: -2rem;
        }

        // :last-child {
        //     bottom: -2rem;
        // }
    }
`;
