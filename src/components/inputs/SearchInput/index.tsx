import React, {useState} from 'react';
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
  const [val, setVal] = useState(props.value);
  return (
    <BasicInput
      {...props}
      value={val}
      onChangeText={v => {
        setVal(v);
        props.onChangeText(v);
      }}
      placeholder={'Search'}
      leftIcon={
        <Icon name="search" size={30} color={theme.grayPalette.text2} />
      }
      rightIcon={
        val ? (
          <Icon name="close" size={30} color={theme.grayPalette.text2} />
        ) : null
      }
      onClickRightIcon={() => {
        setVal('');
        props.onChangeText('');
      }}
    />
  );
};

export default SearchInput;
