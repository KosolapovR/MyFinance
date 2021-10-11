import React, {useCallback, useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TouchableOpacity} from 'react-native';

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
}: Props) => {
  const [activeOpacity, setActiveOpacity] = useState(0);
  const onBegan = useCallback(() => {
    setActiveOpacity(1);
  }, [setActiveOpacity]);
  const onEnded = useCallback(() => {
    setActiveOpacity(0);
  }, [setActiveOpacity]);
  return (
    <Swipeable
      onSwipeableRightWillOpen={onBegan}
      onSwipeableClose={onEnded}
      renderLeftActions={leftSwipeActions}
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={onSwipeableRightOpen}
      onSwipeableLeftOpen={onSwipeableLeftOpen}
      useNativeAnimations={true}>
      <TouchableOpacity
        activeOpacity={activeOpacity}
        delayPressIn={44}
        onPress={onPress}
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          height: '100%',
          paddingHorizontal: 15,
        }}>
        {children}
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ListItem;
