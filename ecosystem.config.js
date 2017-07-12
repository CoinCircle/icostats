module.exports = {

  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'server',
      script: 'server.js',
      instances: 0,
      exec_mode: 'cluster',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'root',
      host: ['165.227.10.250'], //['165.227.1.111', '165.227.9.59'],
      ref: 'origin/master',
      repo: 'https://github.com/icostats/icostats.git',
      path: '/usr/app',
      'pre-setup': 'npm install -g yarn pm2',
      'post-deploy': 'cp /usr/app/.env . && yarn install && npm run build && pm2 startOrReload ./ecosystem.config.js --env production'
    },
    staging: {
      user: 'root',
      host: '165.227.6.170',
      ref: 'origin/master',
      repo: 'https://github.com/icostats/icostats.git',
      path: '/usr/app',
      'pre-setup': 'npm install -g yarn pm2',
      'post-deploy': 'cp /usr/app/.env . && yarn install && npm run build && pm2 startOrReload ./ecosystem.config.js --env staging',
      env: {
        NODE_ENV: 'dev'
      }
    }
  }
};
