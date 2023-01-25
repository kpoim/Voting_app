import styled from 'styled-components';
import Button from '../Button';
import TextInput from '../TextInput';

interface SetupOptionProps {
}

export const SetupOption = styled.div<SetupOptionProps>`
    display: flex;
    width: 85%;
    padding: 1px;
    
    ${TextInput} {
        flex: 1 1 200px;
        border-right: none;
        border-radius: 5px 0 0 5px;
    }

    ${Button} {
        border-radius: 0 5px 5px 0;
        border-left: none;
        display: flex;
        align-items: center;
        padding: 8px;
    }

    :hover, :focus, :focus-within {
        ${TextInput} {
            border-color: #333;
        }
        ${Button} {
            display: flex;
            border-color: #333;
        }
    }
`;
