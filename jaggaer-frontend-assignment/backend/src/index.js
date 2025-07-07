import path from 'node:path';
import Fastify from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { fastifyStatic } from '@fastify/static';
import { fileURLToPath } from 'node:url';
import mercurius from 'mercurius';
import { schema } from './schema.js';
import { resolvers } from './resolvers.js';

const fastify = Fastify({
  logger: true
});

fastify.register(fastifyCors, {
  origin: '*',
  credentials: false,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'assets'),
  prefix: '/assets/',
});

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '127.0.0.1' });
    console.log(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

await start();