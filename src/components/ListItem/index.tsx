import React, {useCallback, useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

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
  children,
}: Props) => {
  const [isSwipe, setSwipe] = useState(false);
  const onBegan = useCallback(() => {
    setSwipe(true);
  }, [setSwipe]);
  const onEnded = useCallback(() => {
    setSwipe(false);
  }, [setSwipe]);
  return (
    <Swipeable
      renderLeftActions={leftSwipeActions}
      renderRightActions={rightSwipeActions}
      onSwipeableOpen={onBegan}
      onSwipeableClose={onEnded}
      useNativeAnimations={true}
      containerStyle={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (!isSwipe) {
            onPress();
          }
        }}
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          height: '100%',
          paddingHorizontal: 15,
        }}>
        {children}
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
});
