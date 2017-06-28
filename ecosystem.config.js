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
      cwd: '/usr/app',
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
      host: ['165.227.1.111', '165.227.9.59', '138.68.56.123'],
      ref: 'origin/master',
      repo: 'https://github.com/icostats/icostats.git',
      path: '/usr/app',
      'post-setup': 'pwd && ls -la && cd /usr/app && git pull origin master',
      'post-deploy': 'yarn install && npm run build && pm2 reload ecosystem.config.js --env production'
    },
    dev: {
      user: 'root',
      host: '165.227.5.48',
      ref: 'origin/master',
      repo: 'https://github.com/icostats/icostats.git',
      path: '/usr/app',
      'post-setup': 'pwd && ls -la && cd /usr/app && git pull origin master',
      'post-deploy': 'yarn install && npm run build && pm2 reload ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev'
      }
    }
  }
};
