import styled from 'styled-components';

export const TextInput = styled.input`
    // border: none;
    outline: none;
    font-size: 16px;
    line-height: 22px;
    padding: 4px;


    border: 1px solid #999;
    border-radius: 5px;


    :hover, :focus, :focus-within {
        border-color: #333;
    }
`;

TextInput.defaultProps = {
    type: 'text',
    maxLength: 80
}
