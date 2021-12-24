import Head from 'next/head'
import Header from './header'


export default function Layout({ children, title, marginTopDisabled }) {

  const drawerItems = [
    {
      id: 1, title: "Cím", items: [
        "Vác, Sziréna köz 8",
      ]
    },
    {
      id: 2, title: "Elérhetőség", items: [
        "(06) 30 123 4567",
        "szunyog@email.com",
      ]
    },
    {
      id: 3, title: "Nyitva tartás", items: [
        "Hétfő 16:00 - 01:00",
        "Kedd 16:00 - 01:00",
        "Szerda 16:00 - 01:00",
        "Csütörtök 16:00 - 01:00",
        "Péntek 16:00 - 04:00",
        "Szombat 16:00 - 04:00",
      ]
    },
    {
      id: 4, title: "Zenegép", items: [], url: "/music"
    }
  ]

  const menus = [
    {
      title: "Kezdőlap",
      url: "/"
    },
    {
      title: "Itallap",
      url: "/drinklist"
    },
    {
      title: "Hírek",
      url: "/posts"
    },
    {
      title: "Galléria",
      url: "/gallery"
    }
  ]

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>{title}</title>
      </Head>
      <Header title={title} drawerItems={drawerItems} menus={menus} />
      <main>
        <div style={{ marginTop: marginTopDisabled ? 0 : 100 }} >
          {children}
        </div>
      </main>
    </div>
  )
}