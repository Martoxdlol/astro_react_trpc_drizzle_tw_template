import { relations } from "drizzle-orm";
import { date, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

export const authIntents = mysqlTable('auth_intents', {
    id: varchar('id', { length: 25 }).primaryKey(),
    verification: text('verification').notNull(),
    codeVerifier: text('code_verifier').notNull(),
    redirect: text('redirect').notNull(),
    createdAt: date('created_at').notNull(),
})

export const sessions = mysqlTable('sessions', {
    id: varchar('id', { length: 100 }).primaryKey(),
    email: varchar('email', { length: 320 }).notNull(),
    name: text('name'),
    picture: text('picture'),
    updatedAt: date('created_at').notNull(),
    createdAt: date('updated_at').notNull(),
})

export const users = mysqlTable('users', {
    id: varchar('id', { length: 200 }).notNull().unique().primaryKey(),
    email: varchar('email', { length: 320 }).notNull().unique(),
    name: text('name'),
    picture: text('picture'),
    updatedAt: date('created_at').notNull(),
    createdAt: date('updated_at').notNull(),
})

export const posts = mysqlTable('posts', {
    id: varchar('id', { length: 200 }).notNull().unique().primaryKey(),
    userId: varchar('user_id', { length: 200 }).notNull(),
    title: text('title'),
    body: text('body'),
    updatedAt: date('created_at').notNull(),
    createdAt: date('updated_at').notNull(),
})

export const postRelations = relations(posts, ({ one }) => ({
    user: one(users, {
        fields: [posts.userId],
        references: [users.id],
    })
}));

export const usersRelations = relations(users, ({ many }) => ({
    posts: many(posts)
}));