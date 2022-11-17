## Running the zero wallet backend service

### 1 - Fill in the `example.yaml` file with your own config and rename it to `config.yaml`

### 2 - Build the docker image:

```
    docker build . -t zero-wallet-backend-service
```

### 3 - Then run the container:

```
    docker run -p 3000:3000 -p 80:80 -p 443:443 zero-wallet-backend-service
```