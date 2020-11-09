import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Search } from '../components/Serach';

export default function Home() {
  return (
    <>
      <Head>
        <title>Search in Torre</title>
      </Head>
      <Search />
    </>
  )
}
