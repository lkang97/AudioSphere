# Frontend Routes

1. '/' - Main Page

   - Displays NavBar - Search - Profile
     - Displays Footer
     - Shows progress bar on currently playing song
     - Play/Pause on song
   - Displays all songs
     - Shows title
     - Shows song image
     - Shows favorite if favorited(if logged in)

2. '/profile' - Profile Page

   - Displays user information
   - Displays user image
   - Displays user songs and favorited songs

3. /songs/:id - Single song page
   - If is owner:
     - Displays CRUD options
   - Else:
     - Displays specific info for the song
     - Waveform (Stretch)
