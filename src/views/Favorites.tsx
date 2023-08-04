import AppMainScreen from "./AppMainScreen";


export function favoritesView() {
    return <AppMainScreen
        title="Favorites"
        builder={() => <CreatePost />}
    />
}

export function CreatePost(props: {}) {
    return (
        <>
            <h1 className="text-xl my-3">Favorites</h1>

        </>
    );
}


