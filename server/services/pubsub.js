const redisClient = require("../config/redis");

const publish = async (channel, message) => {
  await redisClient.publish(channel, JSON.stringify(message));
};

const subscribe = (channel, callback) => {
  const subscriber = redisClient.duplicate();
  subscriber.subscribe(channel);
  subscriber.on("message", (ch, message) => {
    if (ch === channel) {
      callback(JSON.parse(message));
    }
  });
  return subscriber;
};

module.exports = { publish, subscribe };
