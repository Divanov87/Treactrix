import styles from './Loader.module.css';

export default function Loader() {
    return (
        <div className={styles['css-loader']}>
        <span className={styles['loader']}></span>
        </div>
    );
};
