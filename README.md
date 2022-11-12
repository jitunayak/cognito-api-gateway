## Generate AWS_IAM credentials from Cognito credentials

 >setup 🦄

### yarn

> install dependencies 🍔

### yarn start

> run serverless in offline mode 🥂

```curl
dashboard: https://app.serverless.com/jitunayak/apps/poc/cognito-api-gateway/dev/ap-south-1
endpoints:
  POST - http://localhost:3000/login
  POST - http://localhost:3000/secure
functions:
  open: cognito-api-gateway-dev-open
```

```js
 curl --location --request POST 'http://localhost:3000/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": {username},
        "password": {password},
    }'

```
