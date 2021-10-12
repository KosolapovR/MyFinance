import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import CenterView from '../CenterView';
import Scroller, {ScrollerItem} from 'components/Scroller';

const scrollerItems: ScrollerItem[] = [
  {
    id: '1',
    label: 'Eда',
    iconName: 'food',
    actions: {
      onPress: action('click-row'),
      onEdit: () => Promise.resolve(),
      onDelete: action('delete-row'),
    },
  },
  {
    id: '2',
    label: 'Дом',
    iconName: 'home',
    actions: {
      onPress: action('click-row'),
      onEdit: () => Promise.resolve(),
      onDelete: action('delete-row'),
    },
  },
  {
    id: '3',
    label: 'Бензин',
    iconName: 'fuel',
    actions: {
      onPress: action('click-row'),
      onEdit: () => Promise.resolve(),
      onDelete: action('delete-row'),
    },
  },
  {
    id: '4',
    label: 'Кафе',
    iconName: 'coffee',
    actions: {
      onPress: () => console.log('clicked'),
      onEdit: () => Promise.resolve(),
      onDelete: action('delete-row'),
    },
  },
];
storiesOf('Scroller', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('Scroller', () => <Scroller items={scrollerItems} />);
