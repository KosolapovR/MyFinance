import React, {ReactNode} from 'react';
import {TouchableHighlight} from 'react-native';

type PropType = {
  onPress: () => void;
  children: ReactNode;
};

export default function Button({onPress = () => {}, children = null}) {
  return <TouchableHighlight onPress={onPress}>{children}</TouchableHighlight>;
}
