import React, {useState, useCallback} from 'react';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

export default function BasicImageList({photos, photoPerRow}) {

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

    const rows = []
    let rowCounter = 0;
    photoPerRow = 3; 
    for (let i = 0; i < photos.length; i++) {
        const element = photos[i];
        if (i != 0 && i % photoPerRow === 0){
            rowCounter++;
        }
        if(rows[rowCounter] === undefined){
            rows[rowCounter] = [];
        }
        rows[rowCounter].push(element);
    }    
    return (
        <div>
            {rows.map(row => <Gallery photos={row} onClick={openLightbox} />)};
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photos.map(x => ({
                                ...x,
                                key:x.src,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}