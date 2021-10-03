import React from 'react';
import {Platform, View} from 'react-native';
import {Portal, FAB} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import SearchInput from 'components/inputs/SearchInput';
import {useKeyboardVisible} from 'hooks';

function CreditsScreen() {
  const [open, setOpen] = React.useState(false);
  const [fabIsVisible, setFabIsVisible] = React.useState(true);

  const {isKeyboardVisible} = useKeyboardVisible();

  useFocusEffect(() => {
    setFabIsVisible(true);
    return () => {
      setFabIsVisible(false);
    };
  });

  const onStateChange = ({open}: {open: boolean}) => setOpen(open);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <SearchInput onChangeText={() => {}} placeholder="Поиск транзакции" />
      <Portal>
        <FAB.Group
          visible={fabIsVisible && !isKeyboardVisible}
          style={{paddingBottom: Platform.OS === 'ios' ? 88 : 56}}
          open={open}
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'briefcase-upload',
              label: 'Добавить кредит',
              onPress: () => console.log('Pressed outcome'),
              small: false,
            },
            {
              icon: 'briefcase-download',
              label: 'Добавить доход',
              onPress: () => console.log('Pressed income'),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </View>
  );
}

export default CreditsScreen;
