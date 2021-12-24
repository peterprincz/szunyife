import React, { useState, useCallback } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Carousel, { Modal, ModalGateway } from "react-images";
import Typography from '@material-ui/core/Typography';
import { AlbumProperties } from '../types/dataTypes';


export default function Album({ albumTitle, albumDesc, previewPhoto, photos }:AlbumProperties) {

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const classes = {
        card: {

        },
        previewImage: {
            height:200
        }
    }

    return (
        <div>
            <Card style={classes.card}>
                <CardActionArea onClick={(e) => openLightbox(e, {index:0})}>
                    <CardMedia
                        style={classes.previewImage}
                        title={albumTitle}
                        image={previewPhoto.src}
                    >
                    </CardMedia>
                    <CardContent>
                        <Typography align='center' gutterBottom variant="h3">
                            {albumTitle}
                        </Typography>
                        {albumDesc ? <Typography variant="body1">
                            {albumDesc}
                        </Typography> 
                        : 
                        ''}
                    </CardContent>
                </CardActionArea>
            </Card>
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            hideControlsWhenIdle={false}
                            currentIndex={currentImage}
                            views={photos.map(x => ({
                                ...x,
                                key: x.src,
                                source:x.src
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}