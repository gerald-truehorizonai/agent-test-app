# Agent Task

Your job is to implement a missing feature, verify it with tests, and open a pull request.

## Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the existing tests — they should all pass**
   ```bash
   npm test
   ```

3. **Implement `PUT /items/:id`** in `src/routes/items.js`

   - Accept a JSON body with optional `name` and/or `description` fields
   - Update the matching item in the store using `store.update(id, fields)`
   - Return the updated item as JSON with status `200`
   - Return `404` if the item does not exist
   - Return `400` if the body contains neither `name` nor `description`

4. **Add tests** for the new endpoint in `tests/items.test.js`

   Cover at least:
   - Successfully updating `name`
   - Successfully updating `description`
   - `404` for a non-existent id
   - `400` when body is empty

5. **Run tests again — all tests (old + new) must pass**
   ```bash
   npm test
   ```

6. **Commit and push on a new branch**
   ```bash
   git checkout -b feat/put-items-endpoint
   git add src/routes/items.js tests/items.test.js
   git commit -m "feat: implement PUT /items/:id endpoint"
   git push origin feat/put-items-endpoint
   ```

7. **Open a pull request** targeting `main`
   ```bash
   gh pr create --title "feat: implement PUT /items/:id" \
     --body "Adds the missing update endpoint with tests."
   ```
