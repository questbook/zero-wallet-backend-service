## Running the zero wallet backend service

### 1 - Clone this repo and cd into it

```
    git clone https://github.com/questbook/zero-wallet-backend-service.git
    cd zero-wallet-backend-service
```

### 2 - Fill in the `config.sample.yaml` file with your own config and rename it to `config.yaml`

### 3 - Build the docker image:

```
    docker build . -t zero-wallet-backend-service
```

### 4 - Then run the container:

```
    docker run -p 3000:3000 zero-wallet-backend-service
```