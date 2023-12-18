import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Andika } from 'next/font/google';
import ThemeProvider from "../components/ui/ThemeProvider";

const andika = Andika({
    weight: '400',
    subsets: ['latin'],
})


function App({ Component, pageProps, initialDarkMode }: AppProps & { initialDarkMode: boolean }) {
    return (
        <main className={andika.className}>
            <ThemeProvider initialDarkMode={initialDarkMode}>
                <Component {...pageProps} />
            </ThemeProvider>
        </main>
    );
}
App.getInitialProps = async () => {
    let initialDarkMode: boolean | undefined;

    if (typeof window !== 'undefined') initialDarkMode = !!localStorage.getItem('darkMode');

    return { initialDarkMode };
};

export default App;