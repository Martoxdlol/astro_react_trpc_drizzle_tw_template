import * as schema from './schema';
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import crypto from 'crypto';
import { nanoid } from 'nanoid';

export const connection = connect({
    host: import.meta.env.DATABASE_HOST,
    username: import.meta.env.DATABASE_USERNAME,
    password: import.meta.env.DATABASE_PASSWORD,
});

export function generateId() {
    return nanoid()
}

export function generateSecureString(length: number = 32) {
    return crypto.randomBytes(length).toString('hex')
}

export { schema }

export const database = drizzle(connection, { schema });

