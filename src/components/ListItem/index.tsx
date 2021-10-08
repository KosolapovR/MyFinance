import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  onPress: () => void;
  children: Element;
  leftSwipeActions?: () => Element;
  rightSwipeActions?: () => Element;
  onSwipeableRightOpen?: () => void;
  onSwipeableLeftOpen?: () => void;
}

const ListItem = ({
  onPress,
  leftSwipeActions,
  rightSwipeActions,
  onSwipeableRightOpen,
  onSwipeableLeftOpen,
  children,
}: Props) => (
  <Swipeable
    renderLeftActions={leftSwipeActions}
    renderRightActions={rightSwipeActions}
    onSwipeableRightOpen={onSwipeableRightOpen}
    onSwipeableLeftOpen={onSwipeableLeftOpen}>
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: 'white',
      }}>
      {children}
    </TouchableOpacity>
  </Swipeable>
);

export default ListItem;
