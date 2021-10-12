import React from 'react';
import BasicInput from '../BasicInput';
import Icon from 'react-native-vector-icons/EvilIcons';
import {theme} from 'theme';

interface Props {
  onChangeText: (v: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  value?: string;
}

const SearchInput = (props: Props) => {
  return (
    <BasicInput
      {...props}
      placeholder={'Search'}
      leftIcon={
        <Icon name="search" size={30} color={theme.grayPalette.text2} />
      }
    />
  );
};

export default SearchInput;
