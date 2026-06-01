let items = {};
let nextId = 1;

module.exports = {
  getAll: () => Object.values(items),

  getById: (id) => items[id] || null,

  create: ({ name, description = '' }) => {
    const id = String(nextId++);
    items[id] = { id, name, description };
    return items[id];
  },

  // update is intentionally not implemented here — the route should call it once added
  update: (id, fields) => {
    if (!items[id]) return null;
    items[id] = { ...items[id], ...fields };
    return items[id];
  },

  deleteById: (id) => {
    if (!items[id]) return false;
    delete items[id];
    return true;
  },

  reset: () => {
    items = {};
    nextId = 1;
  },
};
