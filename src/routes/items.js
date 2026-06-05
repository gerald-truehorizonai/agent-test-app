const express = require('express');
const store = require('../store');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(store.getAll());
});

router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const item = store.create({ name, description });
  res.status(201).json(item);
});

router.get('/:id', (req, res) => {
  const item = store.getById(req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'item not found' });
  }
  res.json(item);
});


router.put('/:id', (req, res) => {
  const { name, description } = req.body

  if (name !== undefined) {
    if (typeof name !== 'string') {
      return res.status(400).json({ error: 'name must be a non-empty string' })
    }
    if (name.trim() === '') {
      return res.status(400).json({ error: 'name must be a non-empty string' })
    }
  }

  if (description !== undefined) {
    if (typeof description !== 'string') {
      return res.status(400).json({ error: 'description must be a string' })
    }
  }

  const updates = {}
  if (name !== undefined) {
    updates.name = name
  }
  if (description !== undefined) {
    updates.description = description
  }

  const item = store.update(req.params.id, updates)
  if (!item) {
    return res.status(404).json({ error: 'Item not found' })
  }

  res.json(item)
})

router.delete('/:id', (req, res) => {
  const deleted = store.deleteById(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'item not found' });
  }
  res.status(204).send();
});

// TODO: PUT /:id is missing — update an existing item's name and/or description

module.exports = router;
