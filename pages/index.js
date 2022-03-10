import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Transaction from '../components/Transaction'
import Navbar from '../components/Navbar'
import { useEffect } from 'react';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/extratos');
  const data = await res.json();
  return { props: { data } }
}


export default function Home({ data }) {
  useEffect(()=>{
    document.documentElement.lang = "pt-BR";
  },[]);
  
  return (
    <>
      <Head>
        <title>Meus Extratos</title>
        <meta name="description" content="Meus Extratos" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Navbar data={data} />
      {/* <main className={styles.main}>
        {data.reverse().map((mod, index) => (
          <Transaction key={mod._id} data={mod} index={index} length={data.length} nextMod={data[++index]} />
        ))}  
      </main > */}
    </>
  )
}
