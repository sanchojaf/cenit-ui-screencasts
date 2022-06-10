import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

export async function getServerSideProps() {
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLY25EbO7w_Nbr5rXq5xuqaJxxxm8pmf4u&key=${process.env.YOUTUBE_API_KEY}`)
  const getting_started = await res.json();

  const res1 = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLY25EbO7w_NYZek8_JpHYuIu08koIHqi4&key=${process.env.YOUTUBE_API_KEY}`)
  const factory_connect = await res1.json();
  return {
    props: {
      getting_started, factory_connect
    }
  }
}

export default function Home({ getting_started, factory_connect }) {
  return (

    <div className={styles.container}>
      <div className={styles.grid}>
        <span>
          <a href="#getting_started" css="color: blue;" className={styles.card}>Getting Started</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="#connector_factory" className={styles.card}>Connector Factory *New</a>
        </span>
      </div>

      <Head>
        <title>Cenit IO</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title} id="getting_started">
          Getting Started
        </h3>

        <ul className={styles.grid}>
          {getting_started.items.map(({ id, snippet = {} }) => {
            const { title, thumbnails = {}, resourceId = {} } = snippet;
            const { medium } = thumbnails;
            return (
              <li key={id} className={styles.card}>
                <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`} target='_blank' rel='nooopener noreferrer'>
                  <p>
                    <img width={medium.width} height={medium.height} src={medium.url} alt="" />
                  </p>
                  <h4>{title}</h4>
                </a>
              </li>
            )
          })}
        </ul>
      </main>

      <main className={styles.main}>
        <h3 className={styles.title} id="connector_factory">
          Connector Factory
        </h3>

        <ul className={styles.grid}>
          {factory_connect.items.map(({ id, snippet = {} }) => {
            const { title, thumbnails = {}, resourceId = {} } = snippet;
            const { medium } = thumbnails;
            return (
              <li key={id} className={styles.card}>
                <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}>
                  <p>
                    <img width={medium.width} height={medium.height} src={medium.url} alt="" />
                  </p>
                  <h4>{title}</h4>
                </a>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
