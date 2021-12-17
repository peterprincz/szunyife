import React, { useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image'


export default function Carousel({ photos , options = { loop: false } }) {
    const autoplay = useRef(
        Autoplay(
            { delay: 3000, stopOnInteraction: false },
            (emblaRoot) => emblaRoot.parentElement
        )
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current]);

    const scrollNext = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollNext();
        autoplay.current.reset();
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollPrev();
        autoplay.current.reset();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    const classes = {
        viewPort: {
            overflow: "hidden",
            width: "100%",
        },
        innerSlide : {
            position: "relative",
            overflow: "hidden",
            height: 500
        }
    }

    photos.forEach((x, i) => x.id = i);

    return (
        <div>
            <div style={classes.viewPort} ref={emblaRef}>
                <div className="embla__container">
                    {photos.map((photo) => (
                        <div className="embla__slide" key={photo.id}>
                            <div style={classes.innerSlide}>
                                <Image loading="eager" src={photo.src} layout="fill" objectFit="cover" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};