# Auth0 Challenge API

### Description

Based on code from [AlejoFernandez](https://github.com/AlejoFernandez)'s [Webtask API Boilerplate](https://github.com/AlejoFernandez/webtask-api-boilerplate).

API Script that reads data from csv files and parses all of it into JSON:

> api-endpoint/top-100/

Returns the 3 files merged into one json object


> api-endpoint/top-100/password-failure

> api-endpoint/top-100/username-failure

> api-endpoint/top-100/login-count


Each return the requested file parsed into a json object


### Run Locally

```sh
npm install
node run serve [optional :PORT]
```

### Deploy to webtask
```sh
npm install
gulp deployWebtask
```

Don't forget to include your own webtask token

### Side Notes

- Alejo's code & structure rock big time, it was insanly easy to follow his line of thought.
- For a very much simpler version of the server take a look at the 'simple' branch