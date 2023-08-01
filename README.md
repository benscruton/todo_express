Currently a fairly straightforward to-do list app, but I'll keep building it out and give it some more advanced features.

Currently:
- Collections can only be created by API (with an API key in the header)
- Newly-created collections contain one list named "To Do," and there's no way to add new lists (via the front end or the API)
- There are no accounts, only collections.  Collections can be joined with a passphrase.

Down the line, however, some or all of these limitations will likely change!

### GETTING SET UP THE PROJECT

You'll need a `.env` file with at least the following:

```
AES_SECRET_KEY_DB=some-text
AES_SECRET_KEY_CLIENT=some-other-text
API_KEYS='["Stringified", "JSON-array", "of keys"]'
```

Optionally, the following can also be included in order to use a Postgres database rather than a SQLite one (which is the default):

```
# As separate variables:
POSTGRES_PORT=
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

# As a connection string
POSTGRES_CONNECTION_STRING=
```

Finally, the server runs by default on port 8000, but this can be overridden with an environment variable:

```
PORT=
```

### RUNNING THE PROJECT

Once the environment variables are sorted, build the React front end:

```
cd client
yarn build
```

Then, start the back end server.  This will serve both the back-end API as well as the React project.

```
cd ..
node server.js
```

Alternatively, you can run it with Docker, but that part's still a work in progress.  At this point, probably safest to use Postgres via a connection string if you're running it in Docker :)