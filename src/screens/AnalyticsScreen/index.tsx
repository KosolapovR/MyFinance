import React, {useCallback} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {useCurrency} from 'hooks';

function AnalyticsScreen() {
  const {currencies, createCurrency, deleteCurrencyByID} = useCurrency();
  const handleAddCurrency = useCallback(() => {
    createCurrency({name: 'RUB', countryCode: 643, countryName: 'Russia'});
    createCurrency({name: 'USD', countryCode: 810, countryName: 'USA'});
    createCurrency({name: 'EUR', countryCode: 142, countryName: 'EU'});
  }, [createCurrency]);

  const handleDeleteCurrency = useCallback(deleteCurrencyByID, [
    deleteCurrencyByID,
  ]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button title={'add currency'} onPress={handleAddCurrency} />
      <Text>AnalyticsScreen</Text>
      <FlatList
        data={currencies}
        renderItem={({item}) => (
          <Text
            onPress={() => {
              if (item.currency_id) {
                handleDeleteCurrency(item.currency_id);
              }
            }}
            key={item.currency_id}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
}

export default AnalyticsScreen;
