import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev')
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
	console.error('Erro na variável de ambiente', _env.error.format())

	throw new Error('Erro na variável de ambiente')
}

export const env = _env.data