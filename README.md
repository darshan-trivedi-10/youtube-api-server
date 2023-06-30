#  youtube-api-server

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

## Searches for videos in the database based on a search query

- Method: GET
- URL Parameters:
    - None
- Query Parameters:
    - `q` (required): The search query string.
    - `page` (optional):The page number to retrieve (default: 1).
- Request Example: `GET /videos/search?q=Putin%20forum&page=2`
- Response Example:
    - Returns a JSON array of video objects based on the search query and pagination.


