import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../Components/Button';
import Section from '../../Components/Section';

export const Voting: React.FC<any> = ({title, options, countVote}) => {
    const [ selectedOption, setSelectedOption ] = useState<string>();

    useEffect(() => {
        setSelectedOption(current => {
            if (options.some((option: any) => option[0] === current))
                return current;
            return undefined;
        })
    }, [options]);

    const handleVote = () => {
        // setSelectedOption(current => {
        //     const optionIndex = options.findIndex((option: any) => option[0] === current);
        //     countVote(optionIndex);
        //     return undefined;
        // })
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
                // @ts-ignore
                        onChange={(e) => setSelectedOption(e.target.value)}
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
            {/* <div>current: {selectedOption}</div> */}
            {/* <div>
                {options.length 
                    ? <Button
                        variant="add"
                        type="submit"
                        onClick={handleVote}
                        disabled={selectedOption === undefined || options.length < 2}
                    >
                        Vote
                    </Button>
                    : 'No available options'
                }
            </div> */}
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
