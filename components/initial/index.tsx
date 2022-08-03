import { useState } from 'react'
import commonStyles from '../../styles/Common.module.scss'
import styles from './Styles.module.scss'

export default function Initial({ setLink }: { setLink: Function }) {

    const [inputValue, setInputValue] = useState('');

    return (
        <>
            <main className={commonStyles.main}>

                <h1 className={styles.title}>
                    Link Previewer
                </h1>
                <div className={styles.hrLine} />
                <div className={styles.inputWrapper}>
                    <label className={styles.label} >Enter your link here</label>
                    <input className={styles.input} type='text' value={inputValue} onChange={v => setInputValue(v.target.value)} placeholder='https://google.com' />
                    <p className={styles.info}>This link is not valid</p>
                </div>
                <button className={styles.button} onClick={() => {
                    if (isValidHttpUrl(inputValue)) {
                        setLink(inputValue)
                    }
                }}>view</button>
            </main>
        </>
    )
}


/* reference: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url */
function isValidHttpUrl(link: string) {
    let url;

    try {
        url = new URL(link);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}