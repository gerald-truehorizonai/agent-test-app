const request = require('supertest');
const app = require('../src/app');
const store = require('../src/store');

beforeEach(() => store.reset());

describe('GET /items', () => {
  it('returns an empty array when no items exist', async () => {
    const res = await request(app).get('/items');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns all created items', async () => {
    store.create({ name: 'Widget', description: 'A small widget' });
    store.create({ name: 'Gadget', description: 'A small gadget' });
    const res = await request(app).get('/items');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('POST /items', () => {
  it('creates an item and returns 201', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Widget', description: 'A small widget' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: 'Widget', description: 'A small widget' });
    expect(res.body.id).toBeDefined();
  });

  it('returns 400 when name is missing', async () => {
    const res = await request(app).post('/items').send({ description: 'no name here' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('defaults description to empty string when omitted', async () => {
    const res = await request(app).post('/items').send({ name: 'Bare' });
    expect(res.status).toBe(201);
    expect(res.body.description).toBe('');
  });
});

describe('GET /items/:id', () => {
  it('returns the requested item', async () => {
    const item = store.create({ name: 'Widget', description: 'A small widget' });
    const res = await request(app).get(`/items/${item.id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Widget');
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(app).get('/items/999');
    expect(res.status).toBe(404);
  });
});

describe('PUT /items/:id', () => {
  it('updates the item name and returns 200', async () => {
    const item = store.create({ name: 'Widget', description: 'A small widget' });
    const res = await request(app).put(`/items/${item.id}`).send({ name: 'Updated Widget' });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: item.id,
      name: 'Updated Widget',
      description: 'A small widget',
    });
  });

  it('updates the item description and returns 200', async () => {
    const item = store.create({ name: 'Widget', description: 'A small widget' });
    const res = await request(app)
      .put(`/items/${item.id}`)
      .send({ description: 'An updated widget' });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: item.id,
      name: 'Widget',
      description: 'An updated widget',
    });
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(app).put('/items/999').send({ name: 'Missing' });
    expect(res.status).toBe(404);
  });

  it('returns 400 when no update fields are provided', async () => {
    const item = store.create({ name: 'Widget', description: 'A small widget' });
    const res = await request(app).put(`/items/${item.id}`).send({});
    expect(res.status).toBe(400);
  });
});

describe('DELETE /items/:id', () => {
  it('deletes the item and returns 204', async () => {
    const item = store.create({ name: 'Widget', description: 'A small widget' });
    const res = await request(app).delete(`/items/${item.id}`);
    expect(res.status).toBe(204);
    expect(store.getById(item.id)).toBeNull();
  });

  it('returns 404 when deleting a non-existent id', async () => {
    const res = await request(app).delete('/items/999');
    expect(res.status).toBe(404);
  });
});
