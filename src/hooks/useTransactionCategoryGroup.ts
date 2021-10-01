import {useState, useEffect, useCallback} from 'react';
import {useDatabase} from 'context/DatabaseContext';
import {ITransactionCategoryGroup} from 'models/ITransactionCategoryGroup';

// Hook for managing and accessing transactionCategoryGroups (CRUD)
export function useTransactionCategoryGroup() {
  const [transactionCategoryGroups, setTransactionCategoryGroups] = useState<
    ITransactionCategoryGroup[]
  >([]);
  const [
    selectedTransactionCategoryGroup,
    setSelectedTransactionCategoryGroup,
  ] = useState<ITransactionCategoryGroup>();
  const database = useDatabase();

  const refreshListOfTransactionCategoryGroups = useCallback(() => {
    // Query all lists from the DB, then store them as state
    return database
      .getAllTransactionCategoryGroups()
      .then(setTransactionCategoryGroups);
  }, [database]);

  useEffect(() => {
    refreshListOfTransactionCategoryGroups();
  }, [refreshListOfTransactionCategoryGroups]);

  function createTransactionCategoryGroup(
    newTransactionCategoryGroup: ITransactionCategoryGroup,
  ): Promise<void> {
    return database
      .createTransactionCategoryGroup(newTransactionCategoryGroup)
      .then(refreshListOfTransactionCategoryGroups)
      .catch(err => {
        console.error('cannot create transactionCategoryGroup', err);
      });
  }

  function deleteTransactionCategoryGroupByID(id: number): Promise<void> {
    return database
      .deleteTransactionCategoryGroupByID(id)
      .then(refreshListOfTransactionCategoryGroups);
  }

  async function selectTransactionCategoryGroup(
    transactionCategoryGroup: ITransactionCategoryGroup,
  ) {
    setSelectedTransactionCategoryGroup(transactionCategoryGroup);
  }

  return {
    transactionCategoryGroups,
    selectedTransactionCategoryGroup,
    createTransactionCategoryGroup,
    deleteTransactionCategoryGroupByID,
    selectTransactionCategoryGroup,
  };
}
