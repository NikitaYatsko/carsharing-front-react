import { Box, Slider, Typography } from "@mui/material";
import { useState } from "react";

export default function PriceSlider({ priceRange, setPriceRange, maxPrice = 100 }) {
    const handleChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    return (
        <Box sx={{ width: 200, mx: 1 }}>

            <Slider
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={maxPrice}
            />
            <Typography variant="caption">Цена: {priceRange[0]} - {priceRange[1]} $</Typography>
        </Box>
    );
}