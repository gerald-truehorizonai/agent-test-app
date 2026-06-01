# agent-test-app

A minimal Express.js CRUD API for items stored in memory. Used to test AI agent workflows — clone, build, modify, test, commit, PR.

## Setup

```bash
npm install
```

## Run

```bash
npm start        # starts on port 3000
```

## Test

```bash
npm test
```

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | /items | List all items |
| POST | /items | Create an item `{ name, description? }` |
| GET | /items/:id | Get a single item |
| DELETE | /items/:id | Delete an item |

> **Note:** `PUT /items/:id` is not yet implemented. See [AGENT_TASK.md](AGENT_TASK.md).
