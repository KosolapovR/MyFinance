import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {ITransaction} from 'models';

const transactionTableName = 'transactions';
const transactionCategoryTableName = 'transaction_category';
const transactionCategoryGroupTableName = 'transaction_category_group';
const currencyTableName = 'currency';

// const tables = [
//   transactionTableName,
//   transactionCategoryTableName,
//   transactionCategoryGroupTableName,
//   currencyTableName,
// ];

const createTablesQueries = [
  `CREATE TABLE IF NOT EXISTS ${currencyTableName}(
        currency_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );`,
  `CREATE TABLE IF NOT EXISTS ${transactionCategoryGroupTableName}(
        transaction_category_group_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        color TEXT
    );`,
  `CREATE TABLE IF NOT EXISTS ${transactionCategoryTableName}(
        transaction_category_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        transaction_category_group_id INTEGER,
        FOREIGN KEY (transaction_category_group_id) REFERENCES ${transactionCategoryGroupTableName}(transaction_category_group_id)
    );`,
  `CREATE TABLE IF NOT EXISTS ${transactionTableName}(
        transaction_id INTEGER PRIMARY KEY,
        type TEXT NOT NULL,
        comment TEXT,
        sum REAL NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        transaction_category_id INTEGER,
        currency_id INTEGER,
        FOREIGN KEY (transaction_category_id) REFERENCES ${transactionCategoryTableName}(transaction_category_id),
        FOREIGN KEY (currency_id) REFERENCES ${currencyTableName}(currency_id)
    );`,
];

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'my_finance.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  // for (const table of tables) {
  //   const query = `drop table ${table}`;
  //
  //   await db.executeSql(query);
  // }
  for (const query of createTablesQueries) {
    await db.executeSql(query);
  }
};

export const getTransactions = async (
  db: SQLiteDatabase,
): Promise<ITransaction[]> => {
  try {
    const transactions: ITransaction[] = [];
    const results = await db.executeSql(
      `SELECT * FROM ${transactionTableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        transactions.push(result.rows.item(index));
      }
    });
    return transactions;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get transactions !!!');
  }
};

export const saveTransactions = async (
  db: SQLiteDatabase,
  transactions: ITransaction[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${transactionTableName}(transaction_id, type, comment, date, time, sum, category_id, currency_id) values` +
    transactions
      .map(
        i =>
          `(${i.transaction_id}, '${i.type}', '${i.comment}', '${i.date}', '${i.time}', '${i.sum}', '${i.category_id}', '${i.currency_id}')`,
      )
      .join(',');

  return db.executeSql(insertQuery);
};

export const deleteTransaction = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${transactionTableName} where transaction_id = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${transactionTableName}`;

  await db.executeSql(query);
};
