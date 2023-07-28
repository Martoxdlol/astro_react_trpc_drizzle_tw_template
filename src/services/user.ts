import { database, generateId, schema } from "../database";
import { InferModel, eq, sql } from 'drizzle-orm';

export async function getUser(email: string) {
    const [user] = await database.select().from(schema.users).where(eq(schema.users.email, email)).limit(1)
    return user
}

export type UserData = Omit<InferModel<typeof schema.users>, 'createdAt' | 'updatedAt'>;
export type NewUserData = Omit<UserData, 'id'>;

export async function insertOrUpdateUser(user: NewUserData) {
    const id = generateId()

    const data = {
        id,
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    await database.insert(schema.users).values(data).onDuplicateKeyUpdate({
        set: {
            ...user,
            updatedAt: new Date(),
        }
    });

    return data
}