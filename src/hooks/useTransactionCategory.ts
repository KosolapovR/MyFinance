import {useState, useEffect, useCallback} from 'react';
import {useDatabase} from 'context/DatabaseContext';
import {ITransactionCategory} from 'models/ITransactionCategory';

// Hook for managing and accessing transactionCategories (CRUD)
export function useTransactionCategory() {
  const [transactionCategories, setTransactionCategories] = useState<
    ITransactionCategory[]
  >([]);
  const [selectedTransactionCategory, setSelectedTransactionCategory] =
    useState<ITransactionCategory>();
  const database = useDatabase();

  const refreshListOfTransactionCategories = useCallback(() => {
    // Query all lists from the DB, then store them as state
    return database
      .getAllTransactionCategories()
      .then(setTransactionCategories)
      .catch(err => {
        console.error('cannot getAllTransactionCategories', err);
      });
  }, [database]);

  useEffect(() => {
    refreshListOfTransactionCategories();
  }, [refreshListOfTransactionCategories]);

  function createTransactionCategory(
    newTransactionCategory: ITransactionCategory,
  ): Promise<void> {
    return database
      .createTransactionCategory(newTransactionCategory)
      .then(refreshListOfTransactionCategories)
      .catch(err => {
        console.error('cannot create transactionCategory', err);
      });
  }

  function deleteTransactionCategoryByID(id: number): Promise<void> {
    return database
      .deleteTransactionCategoryByID(id)
      .then(refreshListOfTransactionCategories);
  }

  async function selectTransactionCategory(
    transactionCategory: ITransactionCategory,
  ) {
    setSelectedTransactionCategory(transactionCategory);
  }

  return {
    transactionCategories,
    selectedTransactionCategory,
    createTransactionCategory,
    deleteTransactionCategoryByID,
    selectTransactionCategory,
  };
}
