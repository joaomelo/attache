export function initVanillaDb () {
  const collections = {};

  const assertCollection = name => {
    if (!collections[name]) {
      collections[name] = [];
    };
    return collections[name];
  };

  return {
    saveItems (collectionName, items) {
      if (!Array.isArray(items) || items.length === 0) return true;

      const collection = assertCollection(collectionName);
      collection.push(...items);

      return Promise.resolve(true);
    },

    queryAllItems (collectionName) {
      const collection = assertCollection(collectionName);
      return Promise.resolve([...collection]);
    },

    queryItemsSince (collectionName, start) {
      const collection = assertCollection(collectionName);
      return Promise.resolve(collection.filter(r => r.when >= start));
    }
  };
};
