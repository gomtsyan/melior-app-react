# Knext Analytics Dashboard

Analytics dashboard for the KnExt Conversational Search Engine

<!--ts-->
   * [Knext Analytics Dashboard](#knext-analytics-dashboard)
      * [How to](#how-to)
         * [Build the docker image](#build-the-docker-image)
         * [How to Configure the API URL](#how-to-configure-the-api-url)
      * [How Run the dashboard](#how-run-the-dashboard)
         * [Locally](#locally)
         * [Dockerized](#dockerized)
      * [TODO](#todo)

<!-- Added by: jose, at: Wed Jun 23 09:23:54 UTC 2021 -->

<!--te-->

## How to

### Build the docker image

Currently there are two docker files;

* [Dockerfile](Dockerfile)
* [prod.Dockerfile](prod.Dockerfile)

The only difference being how we build the dashboard. When deployed on a Kubernets
cluster behind an `nginx` we have an issue with where the build is located so
the `prod.Dockerfile`, includes the line: `RUN PUBLIC_URL="/analytics" npm run build`

> :exclamation: Currently the Docker build will use the `.env` file to determine
> the `REACT_APP_API_BASE_URI` and setting it at **build time**.

To build the base docker file:

```bash
make build-docker
```

To build the dockerfile for prod:

```bash
PACKAGE_VERSION=$(cat ./package.json | grep -m 1 version | sed 's/[^0-9.]//g')
docker build --rm \
   -t registry.melior.ai/analytics-dashboard:$PACKAGE_VERSION \
   -t registry.melior.ai/analytics-dashboard:latest \
   -f prod.Dockerfile .
```

### How to Configure the API URL

The API URI is read from the `REACT_APP_API_BASE_URI` env.var.

> :exclamation: Important to not include the trailing slash `/` in the
> REACT_APP_API_BASE_URI

```bash
export REACT_APP_API_BASE_URI=localhost:7300/v0.2`
```

## How Run the dashboard

### Locally

In development mode:

```bash
npm install
npm start
```

> **note**: Don't forget to update the SERVER_URL if necessary.
> **note**: By default will listen on port 3000

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


Alternativelly build and serve:

1. Install `serve`

   ```bash
   npm install -g serve
   ```

2. Build and serve

   ```bash
   yarn build
   serve build
   ```

   > **note**: By default will listen on port 5000

### Dockerized

```bash
docker-compose up analytics-frontend
```

## TODO

> **note**: TBD not necessarily in this order...

- [x] [Change components structure](https://bradfrost.com/blog/post/atomic-web-design/)
   (decompose components in atom, molecules & organisms)
- [x] Implement missing features (almost all links inactive)
- [x] Add unit tests and prop types
- [x] Clean up what's not necessary
- [x] Properly parse the _REACT_APP_API_BASE_URI_
- [] Add some comments to make the code readable
- [x] **Make the `REACT_APP_API_BASE_URI` to be dynamic at run time!** (Find description below)
- [x] Rename all these files so it makes some sense; **_DemoColumn_,_SecondDemoColumn_,_SecondDemoPie_!??**


## Create Docker Image

### `$ docker build -t {IMAGE-NAME} .`

To check if everything is OK run `$ docker image ls`

## How run the dashboard with Docker

    $ docker run -it --rm  /
    -e MELIOR_SERVER_URL='https://zig-find-dev-aks.westeurope.cloudapp.azure.com/analytics-api/v0.2'  /
    -e MELIOR_PUBLIC_URL='http://localhost:8080'  /
    -p8080:80 {IMAGE-NAME}

*Tip:* If you get error like *__the input device is not a TTY.  If you are using mintty, try prefixing the command with 'winpty'__* than try

    $ winpty docker run -it --rm  /
    -e MELIOR_SERVER_URL='https://zig-find-dev-aks.westeurope.cloudapp.azure.com/analytics-api/v0.2'  /
    -e MELIOR_PUBLIC_URL='http://localhost:8080'  /
    -p8080:80 {IMAGE-NAME}

Pay attention on lines starting with `-e MELIOR_`. That's the way we can put environment variables into project on each build.

By `-e MELIOR_SERVER_URL='https://zig-find-dev-aks.westeurope.cloudapp.azure.com/analytics-api/v0.2'` line we can manage API url for requests. If this variable is not defined the one in `.env` file will be used instead.

By `-e MELIOR_PUBLIC_URL='http://localhost:8080'` line we can manage BASE url of project.

Open [http://localhost:8080](http://localhost:8080) to view it in the browser (if you are running on local).
