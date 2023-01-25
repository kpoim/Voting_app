import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Options } from '../../App';
import Button from '../../Components/Button';
import Section from '../../Components/Section';

interface VotingProps {
    title: string | undefined;
    options: Options;
    countVote: (optionIndex: number) => void;
}

export const Voting: React.FC<VotingProps> = ({title, options, countVote}) => {
    const [ selectedOption, setSelectedOption ] = useState<string>();

    useEffect(() => {
        setSelectedOption(current => {
            if (options.some((option: any) => option[0] === current))
                return current;
            return undefined;
        })
    }, [options]);

    const handleVote = () => {
        const optionIndex = options.findIndex((option: any) => option[0] === selectedOption);
        countVote(optionIndex);
        setSelectedOption(undefined);
    };

    return (
        <Section>
            <h3 data-test="voting-title">{title}</h3>
            {options.length
                ? <>
                    <div
                        onChange={(e) => setSelectedOption((e.target as HTMLInputElement).value)}
                        data-test="voting-options-wraper"
                    >
                        {options.map((option: any, index: number) => {
                            return (
                                <VotingOption key={`${option[0]}-${option[1]}`}>
                                    <input
                                        type="radio"
                                        name="option"
                                        value={option[0]}
                                        id={`radio-option-${index}`}
                                        disabled={options.length < 2}
                                    />
                                    <label htmlFor={`radio-option-${index}`}>{option[0]}</label>
                                </VotingOption>
                            );
                        })}
                    </div>
                    <div>
                        <Button
                            variant="add"
                            type="submit"
                            onClick={handleVote}
                            disabled={selectedOption === undefined || options.length < 2}
                            data-test="vote-button"
                        >
                            Vote
                        </Button>
                    </div>
                </>
                : <div>No available options</div>
            }
        </Section>
    );
}

const VotingOption = styled.div`
    display: flex;
    margin-bottom: 5px;

    label {
        margin-left: 6px;
    }
`;
