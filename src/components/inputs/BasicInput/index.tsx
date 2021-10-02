import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {TextInput} from 'react-native';

interface StyledProps {
  bgColor?: 'white' | 'grey';
}
interface Props extends StyledProps {
  onChangeText: (v: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  value?: string;
  leftIcon?: ReactNode;
}

const StyledContainer = styled.View`
  /* Adapt the colors based on primary prop */
  background: ${(props: StyledProps) =>
    props.bgColor === 'grey' ? '#F2F2F2' : '#FFFFFF'};
  color: ${(props: StyledProps) =>
    props.bgColor === 'grey' ? '#3E496899' : '#222222'};
  width: 100%;
  border-radius: 8px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
`;

const StyledIcon = styled.View`
  margin-right: 8px;
`;

const StyledTextInput = styled.TextInput`
  flex-shrink: 1;
`;

const BasicInput = ({bgColor = 'grey', leftIcon, ...rest}: Props) => {
  return (
    <StyledContainer bgColor={bgColor}>
      {leftIcon && <StyledIcon>{leftIcon}</StyledIcon>}
      <StyledTextInput {...rest} />
    </StyledContainer>
  );
};

export default BasicInput;
