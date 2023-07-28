import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import AuthStateProvider from "./AuthStateProvider";
import { clientForReactQuery, trpc } from '../client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export default function Providers(props: { children: React.ReactNode }) {


    return <AuthStateProvider>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <trpc.Provider client={clientForReactQuery} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    {props.children}
                </QueryClientProvider>
            </trpc.Provider>
        </ThemeProvider>
    </AuthStateProvider>
}