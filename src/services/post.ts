import { type InferModel, desc } from "drizzle-orm";
import { database, generateId, schema } from "../database";

export async function getRecentPosts() {
    return database.query.posts.findMany({
        limit: 10,
        orderBy: desc(schema.posts.createdAt),
    })
}

export async function getPost(id: string) {

}

export type PostData = Omit<InferModel<typeof schema.posts>, 'createdAt' | 'updatedAt'>;
export type NewPostData = Omit<PostData, 'id'>;

export async function createPost(input: NewPostData) {
    const id = generateId()

    const data = {
        id,
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    await database.insert(schema.posts).values(data)

    return data
}