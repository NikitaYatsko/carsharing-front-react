import React, { useState } from "react";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Avatar,
    IconButton,
    InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Логин
            const response = await axios.post(
                "http://localhost:8089/auth/login",
                {
                    username: form.email,
                    password: form.password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            localStorage.setItem("token", response.data.token);

            // Получение профиля после логина
            const profileResponse = await axios.get("http://localhost:8089/profile/me", {
                headers: { Authorization: `Bearer ${response.data.token}` },
            });

            setUser(profileResponse.data);
            navigate("/profile/me");
        } catch (error) {
            console.error("ERROR:", error.response?.data || error.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.default",
                }}
            >
                <Paper
                    elevation={4}
                    sx={{ p: 4, width: "100%", borderRadius: 3, bgcolor: "background.paper" }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                        <Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText", mb: 1 }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant="h5" fontWeight={600} color="text.primary">
                            Sign in
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Enter your credentials to continue
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={handleChange}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2, py: 1.2 }}>
                            Sign In
                        </Button>

                        <Typography variant="body2" align="center" color="text.secondary">
                            Don't have an account? Sign up
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
