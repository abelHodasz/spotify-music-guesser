# Spotify Music Guesser

This project was forked from the [spotify-web-api-auth](https://github.com/KevinSanji/spotify-web-api-auth) repository.

## What's it about

It's a music guessing game. You have to create 2 teams and each round 1 team guesses the name of the track that is playing. You can use predefined playlists or your own playlists. If you have any questions, contact me on github. Have fun!

### Using your own credentials

You will need to register your app and get your own credentials from the Spotify for Developers Dashboard.

To do so, go to [your Spotify for Developers Dashboard](https://beta.developer.spotify.com/dashboard) and create your application. For the examples, we registered this Redirect URI:

-   http://localhost:8888/callback

Once you have created your app, replace `redirect_uri` in `authorizaton_code\app.js` with the one you get from My Applications.
Create a .env file in the `authorizaton_code` directory and create two environment variables(copy this in the file, and replace with your credentials):

```
CLIENT_ID=<your client id>
CLIENT_SECRET=<your client secret>

```

## Running the app

You will need two servers:

```
$cd authorization_code

$npm install

$node app.js
```

```
$cd client

$npm install

$npm start
```

Then, open `http://localhost:8888` in a browser.
