import React, {useCallback} from 'react';
import {View, Platform} from 'react-native';
import {useKeyboardVisible} from 'hooks/useKeyboardVisible';
import {useFocusEffect} from '@react-navigation/native';
import SearchInput from 'components/inputs/SearchInput';
import {FAB, Portal} from 'react-native-paper';
import {TransactionsStackParamList} from 'navigators/TransactionsStack';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';

type Props = NativeStackScreenProps<
  TransactionsStackParamList,
  'TransactionsScreen'
>;

function TransactionsScreen({navigation}: Props) {
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

  const handleGoToSingleTransactionScreen = useCallback(() => {
    navigation.navigate('SingleTransactionScreen');
  }, [navigation]);

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
              label: 'Добавить расход',
              onPress: handleGoToSingleTransactionScreen,
              small: false,
            },
            {
              icon: 'briefcase-download',
              label: 'Добавить доход',
              onPress: handleGoToSingleTransactionScreen,
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

export default TransactionsScreen;
