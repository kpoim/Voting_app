import styled from 'styled-components';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    variant: 'add' | 'remove';
}

export const Button = styled.button<ButtonProps>`
    padding: 5px 12px;
    background-color: #fff;
    border-radius: 5px;
    color: ${({disabled}) => disabled ? '#bbb' : '#777'};
    border: 1px solid #999;
    cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
    line-height: 16px;

    :hover {
        color: ${({disabled}) => disabled ? '#555' : '#fff'};
        border-color: ${({variant, disabled}) => disabled ? '#333' : variant === 'add' ? '#0e6da2' : '#e43b3b'} !important;
        background-color: ${({variant, disabled}) => disabled ? '#fff' : variant === 'add' ? '#0e6da2' : '#e43b3b'};

        > svg {
            fill: ${({disabled}) => disabled ? '#bbb' : '#fff'};
        }
    }

    > svg {
        fill: ${({disabled}) => disabled ? '#bbb' : '#777'};
    }
`;
