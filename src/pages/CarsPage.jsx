import CarCard from "../components/CarCard.jsx";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography } from "@mui/material";
import ToolBar from "../components/ToolBar.jsx";
import CarSlider from "../components/CarSlider.jsx";

const StyledContainer = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
}));

const StyledCarContainer = styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 16,
}));

export default function CarsPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priceRange, setPriceRange] = useState([0, 100]); // [min, max]

    const filteredCars = cars.filter((car) => {
        const matchesSearch = car.model?.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status ? car.status === status : true;
        const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];

        return matchesSearch && matchesStatus && matchesPrice;
    });

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8089/cars", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCars(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl">
            <CarSlider />
            <ToolBar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onCreate={() => console.log("create car")}
            />

            <Typography variant="h6" sx={{ mb: 2 }}>
                Список машин ({filteredCars.length})
            </Typography>

            <StyledContainer maxWidth="lg">
                <StyledCarContainer>
                    {filteredCars.length > 0 ? (
                        filteredCars.map((car) => <CarCard key={car.id} carsData={car} />)
                    ) : (
                        <Typography sx={{ gridColumn: "1 / -1", textAlign: "center", mt: 4 }}>
                            Ничего не найдено 😕
                        </Typography>
                    )}
                </StyledCarContainer>
            </StyledContainer>
        </Container>
    );
}