import Head from 'next/head'
import Header from './header'


export default function Layout({ children, title }) {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <title>{title}</title>
      </Head>
      <Header title={title}/>
      <main>
        <div style={{marginTop: 100}} >
          {children}
        </div>
      </main>

    </div>
  )
}