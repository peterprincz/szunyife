import Layout, { siteTitle } from '../components/layout'
import React from 'react';
import { getAlbums } from '../util/localDataReader'
import Album from '../components/album'


export async function getStaticProps() {

    return {
        props: getAlbums()
    }
}

export default function Gallery(props) {
    const classes = {
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        albumContainer: {
            marginBottom: "5%",
            marginLeft: 5,
            marginRight: 5,
            minWidth: 300
        },
        galleryContainer: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",

            gap: 10,
        }
    };
    const [state, setState] = React.useState({

    });

    const albums = [props.albums[0], props.albums[0]]
    albums.forEach((album, i) => album.id = i);

    return (
        <Layout title="Galléria">
            <div style={classes.container}>
                <h1>Galléria</h1>
                <div style={classes.galleryContainer}>
                    {albums.map(album => {
                        return (
                            <div style={classes.albumContainer} key={album.id}>
                                <Album albumTitle={album.title} albumDesc={album.desc} previewPhoto={album.photos[0]} photos={album.photos} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

