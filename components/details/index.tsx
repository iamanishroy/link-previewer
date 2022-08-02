import commonStyles from '../../styles/Common.module.scss'
import styles from './Styles.module.scss'

export default function Details() {
    return (
        <div className={commonStyles.container}>
            <main className={commonStyles.main}>
                <h1 className={styles.title}>
                    De Previewer
                </h1>
                <div className={styles.hrLine} />
                <div className={styles.inputWrapper}>
                    <label className={styles.label} >Enter your link here</label>
                    <input className={styles.input} type='text' placeholder='https://google.com' />
                    <p className={styles.info}>This link is not valid</p>
                </div>
                <button className={styles.button}>view</button>
            </main>
        </div>
    )
}

