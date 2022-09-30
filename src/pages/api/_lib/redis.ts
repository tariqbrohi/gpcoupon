import Redis from 'ioredis';

const redis = new Redis({
  port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 14798,
  host:
    process.env.REDIS_HOST ||
    'redis-14798.c11.us-east-1-2.ec2.cloud.redislabs.com',
  password: process.env.REDIS_PASSWORD || 'mZ1OMAe5ZWXnU0zWb4JaECeynjtd3DVs',
});

export default redis;
