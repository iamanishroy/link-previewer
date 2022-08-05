import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                {/* <!-- Primary Meta Tags --> */}
                <meta name="title" content="Link Previewer — Preview and embed title, thumbnail image, description of any public link" />
                <link rel="icon" href="https://link-previewer.anishroy.me/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />
                <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet"></link>
                <meta name="description" content="With Link Previewer you can preview and embed title, thumbnail image, description and many more of any public link..." />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://link-previewer.anishroy.me/" />
                <meta property="og:title" content="Link Previewer — Preview and embed title, thumbnail image, description of any public link" />
                <meta property="og:description" content="With Link Previewer you can preview and embed title, thumbnail image, description and many more of any public link..." />
                <meta property="og:image" content="https://link-previewer.anishroy.me/tn.png" />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://link-previewer.anishroy.me/" />
                <meta property="twitter:title" content="Link Previewer — Preview and embed title, thumbnail image, description of any public link" />
                <meta property="twitter:description" content="With Link Previewer you can preview and embed title, thumbnail image, description and many more of any public link..." />
                <meta property="twitter:image" content="https://link-previewer.anishroy.me/tn.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}