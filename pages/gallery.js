import Layout, { siteTitle } from '../components/layout'
import React from 'react';
import { getIndexData } from '../util/localDataReader'
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import styles from './index.module.css'


export async function getStaticProps() {

    return {
        props: getIndexData()
    }
}

export default function Gallery(props) {
    const classes = {
    };
    const [state, setState] = React.useState({

    });

    return (
        <Layout title="Galléria">
            <ImageList gap={1} className={classes.imageList}>
                {props.photos.map((item) => (
                    <ImageListItem key={item.src}>
                        <img src={item.src} />
                    </ImageListItem>
                ))}
            </ImageList>
        </Layout>
    )
}

