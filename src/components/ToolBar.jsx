import {
    Box,
    TextField,
    MenuItem,
    Button,
    InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PriceSlider from "./PriceSlider.jsx";
import { useState } from "react";

const StyledToolBar = styled(Box)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    margin: "20px 0",
}));

const Controls = styled(Box)(() => ({
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap",
}));

const statusOptions = [
    { value: "", label: "Все статусы" },
    { value: "AVAILABLE", label: "Доступна" },
    { value: "BUSY", label: "Занята" },
    { value: "UNAVAILABLE", label: "Недоступна" },
];

export default function ToolBar({
                                    search,
                                    setSearch,
                                    status,
                                    setStatus,
                                    priceRange,
                                    setPriceRange,
                                    onCreate,
                                }) {
    return (
        <StyledToolBar>
            <Controls>
                {/* 🔍 Поиск */}
                <TextField
                    size="small"
                    placeholder="Поиск по модели..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ width: 500 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                />


                <TextField
                    select
                    size="small"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    sx={{ width: 200 }}
                >
                    {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />
            </Controls>




            {/* ➕ Кнопка создания */}
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onCreate}
            >
                Добавить авто
            </Button>
        </StyledToolBar>
    );
}