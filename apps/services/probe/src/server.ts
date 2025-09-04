import { env } from './config/env.js'
import { createApp } from './app.js'

const app = createApp()

const start = async () => {
  try {
    await app.listen({
      port: env.PORT,
      host: env.HOST || '0.0.0.0',
    })
    console.log(`🚀 Server running on port ${env.PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
