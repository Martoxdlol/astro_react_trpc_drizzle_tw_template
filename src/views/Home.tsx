import type { RouterOutputs } from "../server/api";

export function Home(props: { posts: RouterOutputs['getPostsOfCurrentUser'] | undefined }) {
    return (
        <>
            <h1>Home</h1>
        </>
    );
}