import SQLite from 'react-native-sqlite-storage';

const versionTableName = 'version';
const transactionTableName = 'transactions';
const transactionCategoryTableName = 'transaction_category';
const transactionCategoryGroupTableName = 'transaction_category_group';

const tablesNames = [
  versionTableName,
  transactionCategoryTableName,
  transactionTableName,
  transactionCategoryGroupTableName,
];

const createTablesQueries = [
  `CREATE TABLE IF NOT EXISTS ${versionTableName}(
        version_id INTEGER PRIMARY KEY NOT NULL,
        version INTEGER 
    );`,
  `CREATE TABLE IF NOT EXISTS ${transactionCategoryTableName}(
        transaction_category_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT NOT NULL
    );`,
  `CREATE TABLE IF NOT EXISTS ${transactionTableName}(
        transaction_id INTEGER PRIMARY KEY,
        type TEXT NOT NULL,
        comment TEXT,
        sum REAL NOT NULL,
        date TEXT NOT NULL,
        transaction_category_id INTEGER,
        currency_alphabetic_code TEXT NOT NULL,
        FOREIGN KEY (transaction_category_id) REFERENCES ${transactionCategoryTableName}(transaction_category_id)
    );`,
];

const dropAllTables = false;

export class DatabaseInitialization {
  // Perform any updates to the database schema. These can occur during initial configuration, or after an app store update.
  // This should be called each time the database is opened.

  public async updateDatabaseTables(
    database: SQLite.SQLiteDatabase,
  ): Promise<void> {
    let dbVersion: number = 0;

    //First: create tables if they do not already exist
    return database
      .transaction(this.createTables)
      .then(() => {
        // Get the current database version
        return this.getDatabaseVersion(database);
      })
      .then(version => {
        dbVersion = version;

        // Perform DB updates based on this version

        // This is included as an currency of how you make database schema changes once the app has been shipped
        if (dbVersion < 1) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion1Inserts);
        }
        // otherwise,
        return;
      })
      .then(() => {
        if (dbVersion < 2) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion2Inserts);
        }
        // otherwise,
        return;
      });
  }

  // Perform initial setup of the database tables
  private createTables(transaction: SQLite.Transaction) {
    // DANGER! For dev only
    if (dropAllTables) {
      const query0 = `DROP TABLE IF EXISTS ${tablesNames[0]};`;
      const query1 = `DROP TABLE IF EXISTS ${tablesNames[1]};`;
      const query2 = `DROP TABLE IF EXISTS ${tablesNames[2]};`;
      const query3 = `DROP TABLE IF EXISTS ${tablesNames[3]};`;

      transaction.executeSql(query0);
      transaction.executeSql(query1);
      transaction.executeSql(query2);
      transaction.executeSql(query3);
    } else {
      transaction.executeSql(createTablesQueries[0]);
      transaction.executeSql(createTablesQueries[1]);
      transaction.executeSql(createTablesQueries[2]);
      transaction.executeSql(createTablesQueries[3]);
    }
  }

  // Get the version of the database, as specified in the Version table
  private getDatabaseVersion(database: SQLite.SQLiteDatabase): Promise<number> {
    // Select the highest version number from the version table
    return database
      .executeSql('SELECT version FROM Version ORDER BY version DESC LIMIT 1;')
      .then(([results]) => {
        if (results.rows && results.rows.length > 0) {
          const version = results.rows.item(0).version;
          return version;
        } else {
          return 0;
        }
      })
      .catch(error => {
        console.log(`No version set. Returning 0. Details: ${error}`);
        return 0;
      });
  }

  // Once the app has shipped, use the following functions as a template for updating the database:
  /*
    // This function should be called when the version of the db is < 1
    private preVersion1Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 1 DB inserts");
        // Make schema changes
        transaction.executeSql("ALTER TABLE ...");
        // Lastly, update the database version
        transaction.executeSql("INSERT INTO Version (version) VALUES (1);");
    }
    // This function should be called when the version of the db is < 2
    private preVersion2Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 2 DB inserts");

        // Make schema changes
        transaction.executeSql("ALTER TABLE ...");
        // Lastly, update the database version
        transaction.executeSql("INSERT INTO Version (version) VALUES (2);");
    }
    */
}
