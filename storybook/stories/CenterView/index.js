import React from 'react';
import {View} from 'react-native';
import style from './style';

export default function CenterView({children = null}) {
  return <View style={style.main}>{children}</View>;
}
