import SQLite from 'react-native-sqlite-storage';
import {DatabaseInitialization} from './DatabaseInitialization';
import {DATABASE} from './constants';
import {AppState, AppStateStatus} from 'react-native';
import {ICurrency, ITransaction, ITransactionCategory} from 'models';

export interface Database {
  // Create
  createTransactionCategory(
    newTransactionCategory: ITransactionCategory,
  ): Promise<void>;
  createTransaction(newTransaction: ITransaction): Promise<void>;
  // Read
  getAllCurrencies(): Promise<ICurrency[]>;
  getAllTransactionCategories(): Promise<ITransactionCategory[]>;
  getAllTransactions(): Promise<ITransaction[]>;
  // Update
  updateTransactionCategory(
    updatedTransactionCategory: ITransactionCategory,
  ): Promise<void>;
  updateTransaction(updatedTransaction: ITransaction): Promise<void>;
  // Delete
  deleteTransactionCategoryByID(id: number): Promise<void>;
  deleteTransactionByID(id: number): Promise<void>;
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;

async function createTransactionCategory(
  newTransactionCategory: ITransactionCategory,
): Promise<void> {
  const db = await getDatabase();
  console.log('[db] attempt transaction_category ', newTransactionCategory);
  await db.executeSql(
    'INSERT INTO transaction_category (name, icon) VALUES (?, ?);',
    [newTransactionCategory.name, newTransactionCategory.icon],
  );
}
async function createTransaction(newTransaction: ITransaction): Promise<void> {
  const db = await getDatabase();
  await db.executeSql(
    'INSERT INTO transaction (type, sum, transaction_category_id, currency_id, date, comment) VALUES (?, ?, ?, ?, ?, ?);',
    [
      newTransaction.type,
      newTransaction.sum,
      newTransaction.transaction_category_id,
      newTransaction.currency_id,
      newTransaction.date,
      newTransaction.comment,
    ],
  );
}

// Get an array of all the lists in the database
async function getAllCurrencies(): Promise<ICurrency[]> {
  const db = await getDatabase();
  const [results] = await db.executeSql(
    'SELECT * FROM currency ORDER BY currency_id DESC;',
  );

  if (results === undefined) {
    return [];
  }
  const count = results.rows.length;
  const currencies: ICurrency[] = [];
  for (let i = 0; i < count; i++) {
    const row: ICurrency = results.rows.item(i);
    currencies.push(row);
  }
  return currencies;
}

async function getAllTransactionCategories(): Promise<ITransactionCategory[]> {
  const db = await getDatabase();
  const [results] = await db.executeSql(
    'SELECT * FROM transaction_category ORDER BY transaction_category_id DESC;',
  );
  if (results === undefined) {
    return [];
  }
  const count = results.rows.length;
  const transactionCategories: ITransactionCategory[] = [];
  for (let i = 0; i < count; i++) {
    const row: ITransactionCategory = results.rows.item(i);
    transactionCategories.push(row);
  }
  return transactionCategories;
}
async function getAllTransactions(): Promise<ITransaction[]> {
  const db = await getDatabase();
  const [results] = await db.executeSql(
    'SELECT * FROM transactions ORDER BY transaction_id DESC;',
  );
  if (results === undefined) {
    return [];
  }
  const count = results.rows.length;
  const transactions: ITransaction[] = [];
  for (let i = 0; i < count; i++) {
    const row: ITransaction = results.rows.item(i);
    transactions.push(row);
  }
  return transactions;
}

async function updateTransactionCategory(
  updatedTransactionCategory: ITransactionCategory,
): Promise<void> {
  return getDatabase()
    .then(db =>
      db.executeSql(
        'UPDATE transaction_category SET name = ?, icon = ? WHERE transaction_category_id = ?;',
        [
          updatedTransactionCategory.name,
          updatedTransactionCategory.icon,
          updatedTransactionCategory.transaction_category_id,
        ],
      ),
    )
    .then(([results]) => {
      console.log(
        `[db] transaction_category item with id: ${results.insertId} updated.`,
      );
    });
}
async function updateTransaction(
  updatedTransaction: ITransaction,
): Promise<void> {
  return getDatabase()
    .then(db =>
      db.executeSql(
        'UPDATE transactions SET type = ?, sum = ?, transaction_category_id = ?, currency_id = ?, date = ?, comment = ? WHERE transaction_id = ?;',
        [
          updatedTransaction.type,
          updatedTransaction.sum,
          updatedTransaction.transaction_category_id,
          updatedTransaction.currency_id,
          updatedTransaction.date,
          updatedTransaction.comment,
        ],
      ),
    )
    .then(([results]) => {
      console.log(
        `[db] transaction item with id: ${results.insertId} updated.`,
      );
    });
}

async function deleteTransactionCategoryByID(id: number): Promise<void> {
  return getDatabase()
    .then(db => {
      // Delete list items first, then delete the list itself
      return db
        .executeSql(
          'DELETE FROM transaction_category WHERE transaction_category_id = ?;',
          [id],
        )
        .then(() => db);
    })
    .then(() => {
      console.log(`[db] Deleted transaction_category with id: "${id}"!`);
    });
}
async function deleteTransactionByID(id: number): Promise<void> {
  return getDatabase()
    .then(db => {
      // Delete list items first, then delete the list itself
      return db
        .executeSql('DELETE FROM transactions WHERE transaction_id = ?;', [id])
        .then(() => db);
    })
    .then(() => {
      console.log(`[db] Deleted transactions with id: "${id}"!`);
    });
}

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance);
  }
  // otherwise: open the database first
  return open();
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
  SQLite.DEBUG(false);
  SQLite.enablePromise(true);

  if (databaseInstance) {
    return databaseInstance;
  }

  // Otherwise, create a new instance
  const db = await SQLite.openDatabase({
    name: DATABASE.FILE_NAME,
    location: 'default',
  });

  // Perform any database initialization or updates, if needed
  const databaseInitialization = new DatabaseInitialization();
  await databaseInitialization.updateDatabaseTables(db);

  databaseInstance = db;
  return db;
}

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    return;
  }
  try {
    await databaseInstance.close();
    databaseInstance = undefined;
  } catch (e) {
    console.error('[db] closing db error', e);
    databaseInstance = undefined;
  }
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = 'active';
console.log('[db] Adding listener to handle app state changes');
AppState.addEventListener('change', handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (appState === 'active' && nextAppState.match(/inactive|background/)) {
    // App has moved from the foreground into the background (or become inactive)
    close();
  }
  appState = nextAppState;
}

// Export the functions which fulfill the Database interface contract
export const sqliteDatabase: Database = {
  createTransactionCategory,
  createTransaction,

  getAllCurrencies,
  getAllTransactionCategories,
  getAllTransactions,

  updateTransactionCategory,
  updateTransaction,

  deleteTransactionCategoryByID,
  deleteTransactionByID,
};
