const devConfig = {
  target: 'local',
  port: 3000,
  polyfills: ['@babel/polyfill'],
  mode: 'development',
  rootPath: '',
  staticPath: 'static',
  staticDir: 'static',
  distDir: 'dist',
  eventStoreAdapter: {
    module: 'resolve-eventstore-lite',
    options: {
      databaseFile: 'event-store.db'
    }
  },
  subscribeAdapter: {
    module: 'resolve-subscribe-socket.io',
    options: {}
  },
  jwtCookie: {
    name: 'jwt',
    maxAge: 31536000000
  },
  eventBroker: {
    databaseFile: 'local-bus-broker.db'
  }
}

export default devConfig
