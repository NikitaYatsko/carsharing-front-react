import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Box, IconButton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, FiberManualRecord, Pause, PlayArrow } from "@mui/icons-material";

const SliderContainer = styled(Box)({
    position: "relative",
    width: "100%",
    height: "500px",
    borderRadius: "24px",
    overflow: "hidden",
    marginBottom: "48px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    "&:hover .nav-buttons": {
        opacity: 1,
    },
});

const Slide = styled(Box)(({ image, active }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
    opacity: active ? 1 : 0,
    transform: active ? "scale(1)" : "scale(1.05)",
    zIndex: active ? 2 : 1,
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)",
    },
}));

const SlideContent = styled(Box)({
    position: "absolute",
    bottom: "40px",
    left: "40px",
    right: "40px",
    color: "white",
    zIndex: 3,
    textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
});

const NavButton = styled(IconButton)({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "#333",
    zIndex: 3,
    transition: "all 0.3s ease",
    "&:hover": {
        backgroundColor: "white",
        transform: "translateY(-50%) scale(1.1)",
    },
    opacity: 0,
    "&.nav-buttons": {
        opacity: 0,
    },
});

const DotsContainer = styled(Box)({
    position: "absolute",
    bottom: "20px",
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    zIndex: 3,
});

const Dot = styled(FiberManualRecord)(({ active }) => ({
    fontSize: "12px",
    cursor: "pointer",
    color: active ? "#ff6b6b" : "rgba(255,255,255,0.5)",
    transition: "all 0.3s ease",
    "&:hover": {
        color: "rgba(255,255,255,0.8)",
        transform: "scale(1.2)",
    },
}));

const AutoPlayButton = styled(IconButton)({
    position: "absolute",
    bottom: "20px",
    right: "20px",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    zIndex: 3,
    "&:hover": {
        backgroundColor: "rgba(0,0,0,0.7)",
    },
});

const carImages = [
    {
        url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600",
        title: "Porsche 911 Turbo S",
        description: "Спортивный автомобиль с 650 л.с.",
    },
    {
        url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1600",
        title: "Ferrari SF90 Stradale",
        description: "Гибридный суперкар 1000 л.с.",
    },
    {
        url: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1600",
        title: "Lamborghini Huracán",
        description: "Итальянский стиль и мощь",
    },
];

export default function CarSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carImages.length) % carImages.length);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    return (
        <SliderContainer>
            {carImages.map((car, index) => (
                <Slide key={index} image={car.url} active={index === currentSlide}>
                    {index === currentSlide && (
                        <SlideContent>
                            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                                {car.title}
                            </Typography>
                            <Typography variant="h6">{car.description}</Typography>
                        </SlideContent>
                    )}
                </Slide>
            ))}

            <NavButton className="nav-buttons" onClick={prevSlide} sx={{ left: 20 }} size="large">
                <ChevronLeft />
            </NavButton>
            <NavButton className="nav-buttons" onClick={nextSlide} sx={{ right: 20 }} size="large">
                <ChevronRight />
            </NavButton>

            <DotsContainer>
                {carImages.map((_, index) => (
                    <Dot key={index} active={index === currentSlide} onClick={() => setCurrentSlide(index)} />
                ))}
            </DotsContainer>

            <AutoPlayButton onClick={() => setIsAutoPlaying(!isAutoPlaying)} size="small">
                {isAutoPlaying ? <Pause sx={{ fontSize: 20 }} /> : <PlayArrow sx={{ fontSize: 20 }} />}
            </AutoPlayButton>
        </SliderContainer>
    );
}