# Backend Routes

1. Users:

   - POST "/users"
     - This endpoint will create a new user
   - PUT "/users/:user_id"
     - This endpoint will update user information

2. Songs:

   - GET "/songs"
     - This endpoint returns all songs
   - GET "/songs/:id"
     - This endpoint returns all info for a single song @id
   - POST "/songs"
     - This endpoint will create a new song
   - PUT "/songs/:id"
     - This endpoint will update a song @id
   - DELETE "/songs/:id"
     - This endpoint will delete a song @id

3. Favorites:
   - POST "/songs/:id/favorite"
     - This endpoint adds a favorite to song @id
   - DELETE "/songs/:id/favorite"
     - This endpoint removes a favorite to set @id for logged in user
