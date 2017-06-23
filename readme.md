# ICO Stats

**[How to Contribute](docs/Contributing.md)**

## Initial set up
1) Download Docker.
2) Download yarn.
```
yarn install
```

## Running the app

#### Terminal #1:
```
docker-compose up -d
make serve
```

> Why `make serve` instead of `npm start`?

Two reasons: 1) it does run `npm start` but logs into the container first, and 2) attaches to npm's tty so you can type `rs` to restart the server.


#### Terminal #2:
```
npm run dev
```

### Seed the graph data
```
# This runs once a day in the production server with crontab. Locally it must
  be run manually
make shell

# Once inside the container:
node bin/importGraphData.js
```

## Explore the API

Once the app is running you can view/query the graphql API explorer at: http://localhost:3000/graphiql

![GraphQL](https://d3vv6lp55qjaqc.cloudfront.net/items/3L2j0v3j3J1X0v3i2D37/Screenshot%202017-05-30%2013.31.40.png?X-CloudApp-Visitor-Id=1754851&v=b2deb243)


## Debugging

Chrome canary now ships with a node debugger button as shown below:

![debugger](https://d3vv6lp55qjaqc.cloudfront.net/items/1i0C2O2n1G2F370V2r2N/%5Ba59661ea9da99b4d5a5739016404bb34%5D_Screenshot%25202017-05-23%252005.05.21.png?X-CloudApp-Visitor-Id=1754851&v=e920ded3)

Click on that, and make sure you have localhost:9229 as a source. A console for
the app should show up when it starts.

## Helpers
```
# Create a production build
npm run build   

# Log into the container shell
make shell

# Run node console inside docker
make console
```

Run tests
```
make test
```

## Notes

* In client code, `import '~/foo'` refers to `src/client/foo`. In server code,
  the same code refers to `src/server/foo`. In other words, '~' is an alias for
  the respective code's "home" directory.

* We follow the [airbnb style guide](https://github.com/airbnb/javascript) (with some changes) for javascript and the [airbnb react style guide](https://github.com/airbnb/javascript/tree/master/react) for React.
