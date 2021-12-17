import Layout, { siteTitle } from '../components/layout'
import React from 'react';
import { getAlbums } from '../util/localDataReader'
import Album from '../components/album'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



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
            width: "80%",

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


    props.albums.forEach((album, i) => album.id = i);

    return (
        <Layout title="Galléria">
            <div>
                <Typography variant="h1" align="center" gutterBottom>
                    GALLÉRIA
                </Typography>
                <Grid container justifyContent="center" spacing={8}>
                    {props.albums.map(album => {
                        return (
                            <Grid style={classes.albumContainer} key={album.id}>
                                <Album albumTitle={album.title} albumDesc={album.desc} previewPhoto={album.photos[0]} photos={album.photos} />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </Layout>
    )
}

