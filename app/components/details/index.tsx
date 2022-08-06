import { useEffect, useState } from 'react'
import styles from './styles/Styles.module.scss'
import cardStyle from './styles/Card.module.scss'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { format } from 'json-string-formatter';
import { useClipboard } from 'use-clipboard-copy';


export default function Details({ link, linkData, reset }: { link: string, linkData: { data: Object }, reset: CallableFunction }) {
    const [show, setShow] = useState(false);
    const [jsonObj, setJsonObj] = useState<any>(null);
    const clipboard = useClipboard({ copiedTimeout: 750 });

    useEffect(() => {
        if (process.browser) {
            setShow(true);
        }
    }, [])

    useEffect(() => {
        setJsonObj(linkData.data)
    }, [])

    if (!link || !linkData) {
        return null;
    }

    if (!jsonObj) {
        return null;
    }

    return (
        <div className={styles.details}>
            <div className={styles.top}>
                <h1 className={styles.title}>
                    Link Previewer
                </h1>
                <div className={styles.hrLine} />
            </div>
            <div className={styles.left}>

                <div className={styles.inputWrapper}>
                    <input className={styles.input} ref={clipboard.target} readOnly disabled defaultValue={link} type='text' placeholder='https://google.com' />
                </div>
                <div className={styles.buttonGroup}>
                    <button className={styles.button + " " + styles.secondary} onClick={() => reset()}>reset</button>
                    <button className={styles.button} onClick={clipboard.copy}>
                        {clipboard.copied ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
                {show && jsonObj &&
                    <SyntaxHighlighter
                        language="json"
                        style={materialOceanic}
                        wrapLongLines={true}
                        customStyle={{ overflow: 'auto', marginTop: '24px', borderRadius: '6px', maxWidth: 'calc(100vw - 1.6rem)' }}
                    >
                        {format(JSON.stringify(jsonObj))}
                    </SyntaxHighlighter>
                }

            </div>

            <div className={styles.right}>
                <div className={styles.cardContainer}>
                    <div className={cardStyle.preview_card}>
                        <div className={cardStyle.preview_card_div0}>
                            <img
                                src={jsonObj.image}
                                alt="image"
                            />
                        </div>
                        <div className={cardStyle.preview_card_div1}>
                            <div className={cardStyle.preview_card_text}>
                                <p>{jsonObj.title}</p>
                                <p>{jsonObj.description} </p>
                            </div>
                            {jsonObj.icon &&
                                <div className={cardStyle.preview_card_icon}>
                                    <img src={jsonObj.icon} alt="icon" />
                                </div>
                            }
                        </div>
                        <div className={cardStyle.preview_card_div2}>
                            <span> {jsonObj.type} </span>
                            {jsonObj.owner &&
                                <span> {jsonObj.owner} </span>
                            }
                            <span> {jsonObj.language} </span>
                        </div>
                    </div>
                </div>
                <div className={styles.embed}>
                    <p>Embed this to your website</p>
                    <div
                        className={styles.code}>
                        <code>
                            {` <script src="https://cdn.jsdelivr.net/npm/link-preview-card@1.0.0/dist/script/index.js" defer></script>`}
                        </code>
                    </div>
                    <br />
                    <div
                        className={styles.code}>
                        <code>
                            {`<a href="${link}" link-preview-card custom-border="1px solid black" custom-box-shadow="0px 0px 8px 0px orange"></a>`}
                        </code>
                    </div>
                </div>
            </div>
        </div>
    )
}

