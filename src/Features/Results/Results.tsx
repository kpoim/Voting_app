import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Options } from '../../App';
import Footer from '../../Components/Footer';
import ResultBar from '../../Components/ResultBar';
import ResultsChart from '../../Components/ResultsChart';
import Section from '../../Components/Section';

interface ResultsProps {
    title: string | undefined;
    options: Options;
}

export const Results: React.FC<ResultsProps> = ({title, options}) => {

    const [highestVoteCount, totalVoteCount] = useMemo(
        () => options.reduce((current, option) => ([
                Math.max(current[0], option[1]),
                current[1] + option[1]
            ]),
            [0, 0]
        ),
        [options]
    );

    const votedOptions = useMemo(() => options.filter(option => option[1]), [options]);

    return (
        <Section>
            <h3 data-test="results-title">{title}</h3>
            {totalVoteCount
                ? <>
                    <ResultsChart data-test="results-chart">
                        {votedOptions.map((option, index) => (
                            <ResultBar
                                key={`${option[0]}`}
                                option={option}
                                index={index}
                                id={`option-bar-${index}`}
                                highestVoteCount={highestVoteCount}
                                onPointerEnter={() => {
                                    document.querySelector(`#option-text-${index}`)?.classList.add('highlight');
                                }}
                                onPointerLeave={() => {
                                    document.querySelector(`#option-text-${index}`)?.classList.remove('highlight');
                                }}
                            >
                                <span>{option[1]}</span>
                            </ResultBar>
                        ))}
                    </ResultsChart>
                    <Answers data-test="voted-options">
                        {votedOptions.map((option, index) => (
                            <li
                                key={index}
                                id={`option-text-${index}`}
                                onPointerEnter={() => {
                                    document.querySelector(`#option-bar-${index}`)?.classList.add('highlight');
                                }}
                                onPointerLeave={() => {
                                    document.querySelector(`#option-bar-${index}`)?.classList.remove('highlight');
                                }}
                            >
                                {option[0]}
                            </li>
                        ))}
                    </Answers>
                    <Footer>Total votes: {totalVoteCount}</Footer>
                </>
                : <div>No votes casted yet</div>
            }
        </Section>
    );
}

const Answers = styled.ul`
    > li {
        color: #555;
        font-weight: 300;
        cursor: default;
    }

    li::marker {
        color: #999;
    }

    li:hover, li:hover::marker, .highlight, li.highlight::marker {
        color: #1d5b0d;
        font-weight: 500;
    }
`;
