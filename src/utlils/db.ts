export class IndexedDB {
  private dbName: string;
  private dbVersion: number;
  private storeName: string;

  constructor(dbName: string, dbVersion: number, storeName: string) {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
    this.storeName = storeName;
  }

  async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  public async addItem(item: any): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction(this.storeName, "readwrite");
    const store = transaction.objectStore(this.storeName);
    store.add(item);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  public async getItem(id: number): Promise<any> {
    const db = await this.openDB();
    const transaction = db.transaction(this.storeName, "readonly");
    const store = transaction.objectStore(this.storeName);
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public async getAllItems(): Promise<any[]> {
    const db = await this.openDB();
    const transaction = db.transaction(this.storeName, "readonly");
    const store = transaction.objectStore(this.storeName);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public async updateItem(id: number, updatedItem: any): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction(this.storeName, "readwrite");
    const store = transaction.objectStore(this.storeName);
    store.put({ ...updatedItem, id });
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  public async deleteItem(id: number): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction(this.storeName, "readwrite");
    const store = transaction.objectStore(this.storeName);
    store.delete(id);
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }
}
