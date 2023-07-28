
import {
    createBrowserRouter,
    redirect,
    type RouteObject,
    RouterProvider,
    useRoutes,
} from "react-router-dom";

import AppMainScreen from '../views/AppMainScreen';
import ErrorBoundary from './ErrorBoundry';
import Providers from "./Providers";
import { Home } from "../views/Home";
import { CreatePost, CreatePostView } from "../views/Create";
import { useEffect } from "react";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <div />,
        errorElement: <ErrorBoundary />,
        loader: () => {
            return redirect("/app");
        }
    },
    {
        path: "app",
        element: <AppMainScreen title="Home" builder={({ posts }) => <Home posts={posts} />} />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: "app/create",
        element: <CreatePostView />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: "app/*",
        element: <AppMainScreen title="Not found" builder={({ posts }) => <div><p className="text-2xl mt-8 text-center">The page you were looking was not found</p></div>} />,
        errorElement: <ErrorBoundary />,
    },

]

const router = createBrowserRouter(routes);

export function useCurrentRoute() {
    return useRoutes(routes);
}

export default function AppRouter() {
    useEffect(() => {
        const loadingElem = document.getElementById('initial-loading-bar')

        if (loadingElem) {
            loadingElem.style.opacity = '0'
            setTimeout(() => {
                loadingElem.remove()
            }, 200)
        }
    }, [])

    return <Providers>
        <RouterProvider router={router} />
    </Providers>
}

