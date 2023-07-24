import { openDB } from 'idb';

const initdb = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      db.createObjectStore('jate', { autoIncrement: true });
    },
  });
  return db;
};


export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
  
    store.add({ content: content });
    await tx.done;
    console.log('Content saved to IndexedDB');
  } catch (error) {
    console.error('Error saving to IndexedDB:', error);
  }
};

export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
  
    const content = await store.getAll();
    await tx.done;

    if (content && content.length > 0) {
      return content[content.length - 1].content;
    }
  } catch (error) {
    console.error('Error fetching from IndexedDB:', error);
  }
};