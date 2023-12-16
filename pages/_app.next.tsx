import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Andika } from 'next/font/google';

const andika = Andika({
    weight: '400',
    subsets: ['latin'],
})


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className={andika.className}>
            <Component {...pageProps} />
        </main>
    );
}

export default MyApp;