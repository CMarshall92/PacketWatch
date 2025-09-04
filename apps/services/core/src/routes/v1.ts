import { type FastifyInstance } from 'fastify'
import { db } from '@packetwatch/database'

export async function v1Routes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return { message: 'API is running', version: 'v1' }
  })

  fastify.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: 'v1',
    }
  })

  fastify.post('/monitors/create', async (request) => {
    const data: any = request.body
    await db.activeMonitor.create({
      data: {
        userId: data.userId,
        serviceUrl: data.serviceUrl,
        isApi: data.isApi,
        endpoints: data?.endpoints || [],
      },
    })
    return { status: 200 }
  })
}
