import React, {useCallback} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {useTransactionCategoryGroup} from 'hooks';

function InvestmentsScreen() {
  const {
    transactionCategoryGroups,
    createTransactionCategoryGroup,
    deleteTransactionCategoryGroupByID,
  } = useTransactionCategoryGroup();
  const handleAddTransactionCategoryGroup = useCallback(() => {
    createTransactionCategoryGroup({name: 'Обязательные', color: 'red'});
  }, [createTransactionCategoryGroup]);
  const handleAddTransactionCategoryGroup1 = useCallback(() => {
    createTransactionCategoryGroup({name: 'Развлечения', color: 'blue'});
  }, [createTransactionCategoryGroup]);
  const handleAddTransactionCategoryGroup2 = useCallback(() => {
    createTransactionCategoryGroup({name: 'Развитие', color: 'green'});
  }, [createTransactionCategoryGroup]);

  const handleDeleteTransactionCategoryGroup = useCallback(
    deleteTransactionCategoryGroupByID,
    [deleteTransactionCategoryGroupByID],
  );
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button
        title={'add transactionCategoryGroups'}
        onPress={handleAddTransactionCategoryGroup}
      />
      <Button
        title={'add transactionCategoryGroups2'}
        onPress={handleAddTransactionCategoryGroup1}
      />
      <Button
        title={'add transactionCategoryGroups3'}
        onPress={handleAddTransactionCategoryGroup2}
      />

      <Text>InvestmentsScreen</Text>
      <FlatList
        data={transactionCategoryGroups}
        renderItem={({item}) => (
          <Text
            onPress={() => {
              if (item.transaction_category_group_id) {
                handleDeleteTransactionCategoryGroup(
                  item.transaction_category_group_id,
                );
              }
            }}
            key={item.transaction_category_group_id}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
}

export default InvestmentsScreen;
