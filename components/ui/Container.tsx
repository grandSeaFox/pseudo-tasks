import Head from 'next/head';

type Props = {
    children?: React.ReactElement | React.ReactElement[];
    title?: string;
};
const Container = ({ title, children }: Props) => {
    return (
        <div className="container">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{title}</title>
                <meta name="description" content="PseudoTasks" />
                <link rel="icon" type="image/png" href="/favicon.ico"></link>
            </Head>
           {children}
        </div>
    );
};

export default Container;
