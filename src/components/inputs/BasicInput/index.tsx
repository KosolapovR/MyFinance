import React, {ReactNode} from 'react';
import styled from 'styled-components/native';

interface StyledProps {
  bgColor?: 'white' | 'grey';
}
interface Props extends StyledProps {
  onChangeText: (v: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  value?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClickRightIcon?: () => void;
}

const StyledContainer = styled.View`
  /* Adapt the colors based on primary prop */
  background: ${(props: StyledProps) =>
    props.bgColor === 'grey' ? '#F2F2F2' : '#FFFFFF'};
  color: ${(props: StyledProps) =>
    props.bgColor === 'grey' ? '#3E496899' : '#222222'};
  border-radius: ${props => props.theme.sizes.xs};
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  height: 48px;
  max-height: 48px;
  padding-left: ${props => props.theme.sizes.md};
  padding-right: ${props => props.theme.sizes.md};
  flex: 1;
`;

const StyledLeftIcon = styled.View`
  margin-right: ${props => props.theme.sizes.xs};
`;

const StyledRightIcon = styled.TouchableOpacity`
  margin-left: ${props => props.theme.sizes.xs};
`;

const StyledTextInput = styled.TextInput`
  flex-shrink: 1;
  flex-grow: 1;
`;

const BasicInput = ({
  bgColor = 'grey',
  leftIcon,
  rightIcon,
  onClickRightIcon,
  ...rest
}: Props) => {
  return (
    <StyledContainer bgColor={bgColor}>
      {leftIcon && <StyledLeftIcon>{leftIcon}</StyledLeftIcon>}
      <StyledTextInput {...rest} />
      {rightIcon && (
        <StyledRightIcon onPress={onClickRightIcon}>
          {rightIcon}
        </StyledRightIcon>
      )}
    </StyledContainer>
  );
};

export default BasicInput;
