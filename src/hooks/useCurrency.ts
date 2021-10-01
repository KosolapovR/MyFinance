import {useState, useEffect, useCallback} from 'react';
import {useDatabase} from 'context/DatabaseContext';
import {ICurrency} from 'models/ICurrency';

// Hook for managing and accessing currencies (CRUD)
export function useCurrency() {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<ICurrency>();
  const database = useDatabase();

  const refreshListOfCurrencies = useCallback(() => {
    // Query all lists from the DB, then store them as state
    return database.getAllCurrencies().then(setCurrencies);
  }, [database]);

  useEffect(() => {
    refreshListOfCurrencies();
  }, [refreshListOfCurrencies]);

  function createCurrency(newCurrency: ICurrency): Promise<void> {
    return database
      .createCurrency(newCurrency)
      .then(refreshListOfCurrencies)
      .catch(err => {
        console.error('cannot create currency', err);
      });
  }

  function deleteCurrencyByID(id: number): Promise<void> {
    return database.deleteCurrencyByID(id).then(refreshListOfCurrencies);
  }

  async function selectCurrency(currency: ICurrency) {
    setSelectedCurrency(currency);
  }

  return {
    currencies,
    selectedCurrency,
    createCurrency,
    deleteCurrencyByID,
    selectCurrency,
  };
}
