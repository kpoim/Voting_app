import React, { useCallback, useState } from "react";
import Button from "./Components/Button";
import Container from "./Components/Container";
import SetupOption from "./Components/Option";
import Section from "./Components/Section";
import TextInput from "./Components/TextInput";
import Results from "./Features/Results";
import Voting from "./Features/Voting";
import Icons from './Components/Icons';
import Footer from "./Components/Footer";

type OptionName = string;
type OptionVoteCount = number;

export type Options = [OptionName, OptionVoteCount][];

const App: React.FC = () => {

    const [ title, setTitle ] = useState<string>();
    const [ newOption, setNewOption ] = useState<string>('');
    const [ options, setOptions ] = useState<Options>([]);
    const [ editingAnswerIndex, setEditingAnswerIndex ] = useState<number>();
    const [ editingAnswerValue, setEditingAnswerValue ] = useState<string>();

    const addAnswer = useCallback(() => {
        setNewOption(current => {
            setOptions(currentAnswers => {
                if (current && !currentAnswers.some(option => option[0] === current)) {
                    return [...currentAnswers, [current, 0]];
                }
                return currentAnswers;
            });
            return '';
        })
    }, []);

    const removeAnswer = useCallback((answerToRemove: string) => {
        setOptions(currentOptions => {
            return currentOptions.filter(option => option[0] !== answerToRemove)
        })
    }, []);

    // const editAnswer = useCallback((newValue: string, index: number) => {
    //     setOptions(currentOptions => {
    //         const updatedOption = currentOptions[index];
    //         updatedOption[0] = newValue;
    //         return [
    //             ...currentOptions.slice(0, index),
    //             updatedOption,
    //             ...currentOptions.slice(index + 1, currentOptions.length)
    //         ]
    //     })
    // }, []);

    const prepareToEditOption = useCallback((optionName, index) => {
        setEditingAnswerValue(optionName);
        setEditingAnswerIndex(index);
    }, []);

    const countVote = (optionIndex: number) => {
        setOptions(currentOptions => {
            return [
                ...currentOptions.slice(0, optionIndex),
                [options[optionIndex][0], options[optionIndex][1] + 1],
                ...currentOptions.slice(optionIndex + 1, currentOptions.length)
            ]
        })
    }

    const updateOption = useCallback(() => {
        setEditingAnswerValue(newValue => {
            setEditingAnswerIndex(optionIndex => {
                setOptions(currentOptions => {
                    if (typeof optionIndex !== 'number') return currentOptions;
                    if (!newValue) {
                        return [
                            ...currentOptions.slice(0, optionIndex),
                            ...currentOptions.slice(optionIndex + 1, currentOptions.length)
                        ]
                    }
                    const updatedOption = currentOptions[optionIndex];
                    updatedOption[0] = newValue;
                    return [
                        ...currentOptions.slice(0, optionIndex),
                        updatedOption,
                        ...currentOptions.slice(optionIndex + 1, currentOptions.length)
                    ]
                })

                return undefined
            })
            return undefined;
        })
    }, []);

    const resetApp = useCallback(() => {
        setTitle(undefined);
        (document.querySelector('input.TitleInput') as HTMLInputElement).value = '';
        
        setOptions([]);
        setNewOption('');
        setEditingAnswerIndex(undefined);
        setEditingAnswerValue(undefined);
    }, []);

    return (
        <div className="App">
        <Container>
        <header className="App-header" style={{ height: "20vh" }}>
            Sir vote-a-lot
        </header>
            <Section>
                <TextInput
                    className="TitleInput"
                    onBlur={(e) => {
                        setTitle(e.target.value);
                    }}
                    placeholder="Enter the poll question"
                    data-test="title-input"
                />
                {options.map((answer, index) => (
                    <SetupOption key={answer[0]} data-test={`setup-option-${index}`}>
                        <TextInput
                            onFocus={() => prepareToEditOption(answer[0], index)}
                            value={editingAnswerIndex === index ? editingAnswerValue : answer[0]}
                            onChange={(e) => setEditingAnswerValue(e.target.value)}
                            onBlur={updateOption}
                        />
                        <Button
                            variant="remove"
                            onClick={() => removeAnswer(answer[0])}
                        >
                            <Icons.Remove />
                        </Button>
                    </SetupOption>
                ))}
                {options.length < 10 &&
                    <SetupOption>
                        <TextInput
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                            placeholder="Add option"
                            data-test="new-option-input"
                        />
                        <Button
                            variant="add"
                            disabled={!newOption.length || options.some(option => option[0] === newOption)}
                            onClick={addAnswer}
                            data-test="add-new-option-button"
                        >
                            <Icons.Add/>
                        </Button>
                    </SetupOption>
                }
                <Footer>
                    <div>{options.length}/10 possible answers</div>
                    <Button
                        variant="remove"
                        onClick={resetApp}
                        disabled={!title && !options.length}
                        data-test="reset-button"
                    >
                        Reset
                    </Button>
                </Footer>
            </Section>
            <Voting
                title={title}
                options={options}
                countVote={countVote}
            />
            <Results
                title={title}
                options={options}
            />
        </Container>
        </div>
    );
};

export default App;
