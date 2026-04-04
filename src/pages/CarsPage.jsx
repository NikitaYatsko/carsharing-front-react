import CarCard from "../components/CarCard.jsx";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function CarsPage() {

    const StyledContainer = styled(Container)(({theme}) => ({
        backgroundColor: theme.palette.background.default,
    }));
    const StyledCarContainer = styled(Box)(({theme}) => ({
        backgroundColor: theme.palette.background.default,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "10px",

    }))

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8089/cars", {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setCars(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", mt: 10}}>
                <CircularProgress/>
            </Box>
        );
    }
    if (!cars) {
        return (
            <Box>
                <Typography>
                    ошибка
                </Typography>
            </Box>
        )
    }
    return (
        <>
            <StyledContainer maxWidth="xl">
                <h1>Список машин</h1>
                <StyledCarContainer>
                    {cars.map((car) => (
                        <CarCard key={car.id} carsData={car} />
                    ))}
                </StyledCarContainer>
            </StyledContainer>
        </>
    );


}