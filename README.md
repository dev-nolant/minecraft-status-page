# minecraft-status-page

A one-page status card for a Minecraft server: online or offline, version, and who's playing (with their skin heads).

It's built for servers run with [Crafty Controller](https://craftycontrol.com/). A Netlify function asks Crafty whether the server is running, so your Crafty API token never reaches the browser. The player list comes from the public [mcsrvstat.us](https://mcsrvstat.us/) API.

## Setup

1. Fork this repo and deploy it on Netlify.
2. In Crafty, create an API token for a user that can see the server, and copy the server's ID from its URL.
3. Add these environment variables in Netlify:

   | Variable | Example |
   |---|---|
   | `CRAFTY_URL` | `https://crafty.example.com:8443` |
   | `CRAFTY_SERVER_ID` | `5d0c1c6e-...` |
   | `CRAFTY_TOKEN` | your API token |

4. Edit the two lines at the top of the script in `index.html`:

   ```js
   const SERVER_ADDRESS = "play.example.com";
   const SERVER_LINK = "";   // optional: rules page, Discord invite...
   ```

The function only passes through whether the server is running and its version, nothing else from the panel.

## License

MIT
