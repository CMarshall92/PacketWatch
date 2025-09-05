import { type FastifyInstance } from 'fastify'
import { type GetMonitors, type CreateMonitor, SelectMonitor } from '@packetwatch/shared-types'
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
      orderBy: [
        {
          // 1. Sort by date, descending. Nulls are placed last.
          lastSelectedAt: { sort: 'desc', nulls: 'last' },
        },
        {
          // 2. As a tie-breaker, sort by ID ascending.
          id: 'asc',
        },
      ],
      where: {
        userId: query.userId,
      },
    })

    return {
      status: 200,
      data: { selected: response?.[0]?.slug || null, locations: response },
    }
  })

  fastify.post('/monitors/create', async (request) => {
    const data = request.body as CreateMonitor

    const response = await db.activeMonitor.create({
      data: {
        userId: data.userId,
        slug: uuidv4(),
        lastSelectedAt: new Date(),

        label: data.label,
        serviceUrl: data.serviceUrl,
        isApi: data.isApi,
        endpoints: data?.endpoints || [],
        icon: data.icon,
      },
    })

    return { status: 200, data: response }
  })

  fastify.post('/monitors/select', async (request, reply) => {
    const data = request.body as SelectMonitor

    if (!data.userId) {
      return reply.status(400).send({ error: 'userId is a required in the request body.' })
    }

    if (!data.slug) {
      return reply.status(400).send({ error: 'slug is a required in the request body.' })
    }

    const updateResponse = await db.activeMonitor.update({
      where: {
        userId: data.userId,
        slug: data.slug,
      },
      data: {
        lastSelectedAt: new Date(),
      },
    })

    return { status: 200, data: updateResponse }
  })
}
