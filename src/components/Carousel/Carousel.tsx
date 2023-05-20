import React, { useState } from 'react';
import classes from './Carousel.module.scss';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface CarouselProps {
    images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = images.length;
    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 5 + totalSlides) % totalSlides);
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 5) % totalSlides);
    };

    return (
        <div className={classes.carousel}>
            <div className={classes.carouselInner}>
                <button className={classes.carouselBtn} onClick={prevSlide}>
                    <KeyboardArrowLeftIcon/>
                </button>
                <div className={classes.slidesWrapper}>
                    <div className={classes.slides} style={{ transform: `translateX(-${currentSlide * 20}%)` }}>
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`img ${index}`}
                            />
                        ))}
                    </div>
                </div>
                <button className={classes.carouselBtn} onClick={nextSlide}>
                    <KeyboardArrowRightIcon/>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
