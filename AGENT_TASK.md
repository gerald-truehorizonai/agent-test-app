# Agent Task

Your job is to implement a missing feature, verify it with tests, start the web UI, and open a pull request.

## Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the existing tests — they should all pass**
   ```bash
   npm test
   ```

3. **Start the app and share the URL**

   Start the server in the background:
   ```bash
   npm start &
   ```

   Find the IP address of this machine:
   ```bash
   hostname -I | awk '{print $1}'
   ```

   The web UI is now live at **`http://<IP>:3000`** — share that URL.

   Open the UI and verify it loads. Try adding and deleting an item. Click **Edit** on any item — it will fail with a "not implemented yet" message. That is the feature you are about to add.

4. **Implement `PUT /items/:id`** in `src/routes/items.js`

   - Accept a JSON body with optional `name` and/or `description` fields
   - Update the matching item in the store using `store.update(id, fields)`
   - Return the updated item as JSON with status `200`
   - Return `404` if the item does not exist
   - Return `400` if the body contains neither `name` nor `description`

5. **Reload the running server** so the new route is live

   Stop the background server and restart it:
   ```bash
   kill $(lsof -ti:3000) 2>/dev/null; npm start &
   ```

   Go back to the UI and click **Edit** on an item — it should now save successfully.

6. **Add tests** for the new endpoint in `tests/items.test.js`

   Cover at least:
   - Successfully updating `name`
   - Successfully updating `description`
   - `404` for a non-existent id
   - `400` when body is empty

7. **Run all tests — old and new must pass**
   ```bash
   npm test
   ```

8. **Commit and push on a new branch**
   ```bash
   git checkout -b feat/put-items-endpoint
   git add src/routes/items.js tests/items.test.js
   git commit -m "feat: implement PUT /items/:id endpoint"
   git push origin feat/put-items-endpoint
   ```

9. **Open a pull request** targeting `main`
   ```bash
   gh pr create \
     --title "feat: implement PUT /items/:id" \
     --body "Adds the missing update endpoint with tests. Edit button in the web UI now works."
   ```
