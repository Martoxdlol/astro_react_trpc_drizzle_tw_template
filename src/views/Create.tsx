import type { RouterOutputs } from "../server/api";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AppMainScreen from "./AppMainScreen";
import { Button } from "@mui/material";


export function CreatePostView() {
    return <AppMainScreen
        title="Create"
        builder={() => <CreatePost />}
        action={<Button variant="contained">Create</Button>}
    />
}

export function CreatePost(props: {}) {
    return (
        <>
            <h1 className="text-xl my-3">Create new post</h1>

            <div className="flex flex-col gap-4">
                <TextField label="Title" variant="filled" fullWidth />
                <TextField label="Content" placeholder="Write yout post here..." variant="filled" multiline fullWidth minRows={5} maxRows={100} />
            </div>
        </>
    );
}


