import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Initial from '../components/initial'
import getLinkData from '../helpers/getLinkData'
import styles from '../styles/Common.module.scss'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Details = dynamic(() => import('../components/details'), {
  suspense: true,
})

const Home: NextPage = () => {
  const [link, setLink] = useState<string | null>(null);
  const [linkData, setLinkData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      setNotFound(false)
      if (link) {
        setLoading(true)
        const data = await getLinkData(link);
        if (data) {
          setLinkData(data)
        } else {
          setNotFound(true)
        }
        setLoading(false)
      }
    })();
  }, [link])

  function reset(): void {
    setLink(null)
    setLinkData(null)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {link !== null && linkData ?
          <>
            {typeof window !== undefined &&
              <Suspense fallback={`Loading...`}>
                <Details link={link} linkData={linkData} reset={reset} />
              </Suspense>
            }
          </>
          :
          <Initial setLink={setLink} loading={loading} notFound={notFound} />
        }
      </main>

      <footer className={styles.footer}>
        Designed and Developed by
        <a
          href="https://anishroy.me"
          target="_blank"
          rel="noopener noreferrer"
        > Anish Roy
        </a>
      </footer>
    </div>
  )
}

export default Home
