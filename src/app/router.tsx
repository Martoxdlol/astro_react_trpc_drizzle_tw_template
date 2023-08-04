
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
import { Home, homeView } from "../views/Home";
import { CreatePost, createPostView } from "../views/Create";
import { useEffect } from "react";
import { favoritesView } from "../views/Favorites";

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
        element: homeView(),
        errorElement: <ErrorBoundary />,
    },
    {
        path: "app/create",
        element: createPostView(),
        errorElement: <ErrorBoundary />,
    },
    {
        path: "app/favorites",
        element: favoritesView(),
        errorElement: <ErrorBoundary />,
    },
    {
        path: "app/*",
        element: notFoundView(),
        errorElement: <ErrorBoundary />,
    },

]

function notFoundView() {
    return <AppMainScreen title="Not found" builder={({ posts }) => <div><p className="text-2xl mt-8 text-center">The page you were looking was not found</p></div>} />
}

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

