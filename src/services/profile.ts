import z from 'zod'

export async function getProfilesOf(email: string) {
    return []
}

export const profileSchema = z.object({
    name: z.string(),
    identifier: z.string(),
    description: z.string().optional(),
    avatar: z.string().optional()
})

export type ProfileData = z.infer<typeof profileSchema>

export async function createProfile(email: string, data: ProfileData) {

}