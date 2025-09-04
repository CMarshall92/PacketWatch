import { type FastifyInstance } from 'fastify'
import { type GetMonitors, type CreateMonitor } from '@packetwatch/shared-types'
import { db } from '@packetwatch/database'
import { v4 as uuidv4 } from 'uuid'

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

  fastify.get('/monitors/all', async (request, reply) => {
    const query = request.query as GetMonitors

    if (!query.userId) {
      return reply.status(400).send({ error: 'userId is a required query parameter.' })
    }

    const response = await db.activeMonitor.findMany({
      where: {
        userId: query.userId,
      },
    })

    return { status: 200, data: response }
  })

  fastify.post('/monitors/create', async (request) => {
    const data = request.body as CreateMonitor

    const response = await db.activeMonitor.create({
      data: {
        userId: data.userId,
        slug: uuidv4(),

        icon: '',
        serviceUrl: data.serviceUrl,
        isApi: data.isApi,
        endpoints: data?.endpoints || [],
      },
    })

    return { status: 200, data: response }
  })
}
