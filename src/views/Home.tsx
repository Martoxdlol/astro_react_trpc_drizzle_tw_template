import type { RouterOutputs } from "../server/api";
import AppMainScreen from "./AppMainScreen";


export function homeView() {
    return <AppMainScreen title="Home" builder={({ posts }) => <Home posts={posts} />} />
}

export function Home(props: { posts: RouterOutputs['getPostsOfCurrentUser'] | undefined }) {
    return (
        <>
            <h1>Home</h1>
        </>
    );
}