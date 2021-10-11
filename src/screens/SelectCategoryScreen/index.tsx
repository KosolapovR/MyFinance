import React from 'react';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {TransactionsStackParamList} from 'navigators/TransactionsStack';
import Scroller, {ScrollerItem} from 'components/Scroller';

type Props = NativeStackScreenProps<
  TransactionsStackParamList,
  'SelectCategoryScreen'
>;

const scrollerItems: ScrollerItem[] = [
  {
    id: 1,
    label: 'Eда',
    iconName: 'food',
    actions: {
      onPress: () => {},
      onEdit: () => Promise.resolve(),
      onDelete: () => {},
    },
  },
  {
    id: 2,
    label: 'Дом',
    iconName: 'home',
    actions: {
      onPress: () => {},
      onEdit: () => Promise.resolve(),
      onDelete: () => {},
    },
  },
  {
    id: 3,
    label: 'Бензин',
    iconName: 'fuel',
    actions: {
      onPress: () => {},
      onEdit: () => Promise.resolve(),
      onDelete: () => {},
    },
  },
  {
    id: 4,
    label: 'Кафе',
    iconName: 'coffee',
    actions: {
      onPress: () => {},
      onEdit: () => Promise.resolve(),
      onDelete: () => {},
    },
  },
];

function SelectCategoryScreen({}: Props) {
  return <Scroller items={scrollerItems} />;
}

export default SelectCategoryScreen;
