import { type FastifyInstance } from 'fastify';
import { db } from '@packetwatch/database';

export async function v1Routes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return { message: 'API is running', version: 'v1' };
  });

  fastify.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: 'v1',
    };
  });

  fastify.post('/monitor', async (request) => {
    const data: any = request.body;
    const monitor = await db.activeMonitor.create({
      data: {
        serviceUrl: data.serviceUrl,
        isApi: data.isApi,
        endpoints: data.endpoints,
      }
    })
    console.log(monitor)
    return { status: 200 };
  });
}
