import { useState } from "react";
import { onMounted } from "./hooks/onMounted";
import { fetchSession, getLocalSession } from "../client/auth";

export default function AuthStateProvider(props: { children: React.ReactNode }) {
    const [session, setSession] = useState(getLocalSession())

    onMounted(async () => {
        if (!session) {
            const fetchedSession = await fetchSession()

            if (!fetchedSession) {
                window.location.href = "/signin?redirect="+encodeURIComponent(window.location.href)
            }

            setSession(fetchedSession)
        }
    })

    if (!session) {
        return <div></div>
    }

    return <>
        {props.children}
    </>
}