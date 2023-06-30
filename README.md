#  youtube-api-server

## Youtube API

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

- URL: /youtube/stop
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