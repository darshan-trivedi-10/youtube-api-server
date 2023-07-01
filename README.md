#  youtube-api-server

## Build Step

- Clone this Repository
- Move to the project directory
- Create a .env file in the project directory and add your MongoDB connection string to it. Open the .env file in a text editor and add the following line:
    ```js
    DB_LINK = <YOUR_MONGODB_LINK>
    ```
- run `npm install`
- run `npm start`

- This will start the application and make it accessible at the specified port (usually `http://localhost:5000`).

## Youtube API
- BASE URL : `localhost:5000/api/v1`

### Start Fetching Videos
- Start fetching YouTube videos based on a keyword.

- URL: `/youtube/start`
- Method: POST
- Request Body:
- keyword (string, required): The keyword to search for YouTube videos.
- Response:
    - Status: 200 OK if the operation is successful.
- Example
    ```js
    Request:
    POST /youtube/start
    {
        "keyword": "cricket highlights"
    }
    Status: 200 OK
    ```
### Stop Fetching Videos
- Stop fetching YouTube videos.

- URL: `/youtube/stop`
- Method: POST
- Response:
    - Status: 200 OK if the operation is successful.
- Example:
    ```js
    Request:
    POST /youtube/stop
    Response:
    Status: 200 OK
    ```

## Search API

### Fetches videos from the database with pagination.

- URL : `/videos/search/:page`
- Method : GET
- URL Parameters :
    - `page` (optional) : The page number to retrieve (default: 1).
- Request Example: `GET /videos/search/2`
- Response Example:
    - Returns a JSON array of video objects based on the specified page number.

### Searches for videos in the database based on a search query

- Method: GET
- URL Parameters:
    - None
- Query Parameters:
    - `q` (required): The search query string.
    - `page` (optional):The page number to retrieve (default: 1).
- Request Example: `GET /videos/search?q=Putin%20forum&page=2`
- Response Example:
    - Returns a JSON array of video objects based on the search query and pagination.

## API Key Management
### Add Key
- Adds a new key to the key.json file.

- URL: `/add/key`
- Method: POST
- Response:
    - Status: 200 OK if the operation is successful.
- Example:
    ```js
    POST /add/key
    {
        "key": "YOUR_KEY_HERE"
    }
    Response:
    Status: 200 OK
    ```
### Get Keys
- Retrieves all keys from the key.json file.

- Method: GET
- URL Parameters:
    - None
- Request Example: `GET /get/keys`
