import Head from 'next/head';
import styles from '../../styles/ui/Container.module.scss';

type Props = {
    children?: React.ReactElement | React.ReactElement[];
    title?: string;
};
const Container = ({ title, children }: Props) => {
    return (
        <div className={styles.container}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{title}</title>
                <meta name="description" content="Totaldime" />
                <link rel="icon" type="image/png" href="/favicon.ico"></link>
            </Head>
           {children}
        </div>
    );
};

export default Container;
