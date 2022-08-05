import { useState } from 'react'
import commonStyles from '../../styles/Common.module.scss'
import styles from './styles/Styles.module.scss'
import loader from './styles/Loader.module.scss'

export default function Initial({ setLink, loading }: { setLink: Function, loading: boolean }) {

    const [inputValue, setInputValue] = useState('https://');
    const [showInvalid, setShowInvalid] = useState(false);
    function onClickHandler() {
        if (isValidHttpUrl(inputValue)) {
            setLink(inputValue)
        } else {
            setShowInvalid(true)
        }
    }

    return (
        <>
            <main className={commonStyles.main}>
                <h1 className={styles.title}>
                    Link Previewer
                </h1>
                <div className={styles.hrLine} />
                <div className={styles.inputWrapper}>
                    <label className={styles.label} >Enter your link here</label>
                    <input disabled={loading} className={styles.input} type='text' value={inputValue} onChange={v => {
                        setInputValue(v.target.value)
                        setShowInvalid(false)
                    }} placeholder='https://google.com' />
                    {loading &&
                        <div className={loader.loader_line}></div>
                    }
                    <p className={styles.info}>{showInvalid && "This link is not valid"}</p>
                </div>
                <button disabled={loading} className={styles.button} onClick={onClickHandler}>view</button>
            </main>
        </>
    )
}


/* reference: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url */
function isValidHttpUrl(link: string) {
    let url;
    try {
        url = new URL(link);
    }
    catch (e) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}