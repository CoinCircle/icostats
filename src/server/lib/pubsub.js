/* eslint-disable no-console*/
import { RedisPubSub } from 'graphql-redis-subscriptions';
import settings from 'settings';

const pubsub = new RedisPubSub({
  connection: {
    url: settings.REDIS_URI,
    host: 'redis',
    retry_strategy: options => {
      // reconnect after
      return Math.max(options.attempt * 100, 3000);
    }
  },
  connectionListener: (err) => {
    if (err) {
      console.error(err);
    }
    console.info('Pubsub: Succefuly connected to redis');
  }
});

export default pubsub;
