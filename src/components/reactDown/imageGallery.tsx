import { faChevronLeft, faChevronRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState, useMemo, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import ResponsiveImage from '../responsiveImage/responsiveImage';

export interface Image {
    id: number;
    src: string;
    alt: string;
}

interface Props {
    images: Image[];
}

export default function ImageGallery({ images }: Props) {

    const [playing, setPlaying] = useState<boolean>(true);
    const [currentImg, setCurrentImg] = useState(images[0]);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
    const currentIndex = useMemo(() => {
        if (!currentImg) return -1;
        return images.findIndex(r => r.id === currentImg.id);
    }, [currentImg, images]);

    const onLeftButtonClick = () => {
        const nextIndex = currentIndex - 1 < 0 ? images.length -1 : currentIndex - 1;
        setCurrentImg(images[nextIndex]);
    }

    const onRightButtonClick = () => {
        const nextIndex = currentIndex + 1 >= images.length ? 0 : currentIndex + 1;
        setCurrentImg(images[nextIndex])
    }


    useEffect(() => {

        if (timeoutId) clearTimeout(timeoutId);

        // If playing is false return
        if (!playing) return;

        setTimeoutId(setTimeout(() => {
            onRightButtonClick();

        }, 5000))

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        }

    }, [currentImg, playing]);

    const controlBtnStyle: React.CSSProperties = {
        position: 'absolute', 
        top: '50%', 
        opacity: 0.5, 
        background: '#fff'
    }

    return (
        <div className="img-gallery mt-3 mb-5">
            <div 
                className="current-img mb-2 position-relative text-center" 
                style={{ maxHeight: 600}}
            >
                <button 
                    className="btn border"
                    onClick={onLeftButtonClick} 
                    style={{ ...controlBtnStyle, left: 5 }}
                    aria-label="Go to previous image"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button 
                    className="btn border"
                    onClick={onRightButtonClick} 
                    style={{ ...controlBtnStyle, right: 5 }}
                    aria-label="Go to next image"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <ResponsiveImage 
                    maxHeight={600}
                    src={currentImg.src} 
                    alt={currentImg.alt} 
                />            
            </div>
            <div className="pause text-center mb-3">
                <button 
                    className="border btn"
                    title={playing ? "Pause slideshow" : "Play slideshow"}
                    onClick={() => setPlaying(state => !state)}
                >
                    <FontAwesomeIcon 
                        icon={playing ? faPause : faPlay} 
                    />
                </button>
            </div>
            <Row 
                className="thumbnails"
                style={{
                    maxHeight: 300,
                    overflowY: 'scroll'
                }}
            >
                {images.map(image => (
                    <Col 
                        xl={2} 
                        md={3}
                        sm={6}
                        xs={6}
                        key={image.id} 
                        className="mb-2 position-relative"
                        onClick={() => setCurrentImg(image)}
                        style={ { ...{ 
                            height: 120,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            textAlign: 'center'
                        }, ...(image.id !== currentImg.id ? {} : {
                            border: '2px solid #777'
                        }) }}
                    >
                        <ResponsiveImage 
                            src={image.src} 
                            alt={image.alt} 
                            className="img-thumbnail" 
                            maxHeight={120}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

