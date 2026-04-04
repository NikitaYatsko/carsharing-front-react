import React, { useState, useEffect } from "react";
import {
    Container,
    Box,
    Typography,
    Avatar,
    Paper,
    CircularProgress,
    Chip,
    Stack,
} from "@mui/material";
import axios from "axios";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8089/profile/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        return (
            <Typography variant="h6" color="error" align="center" mt={10}>
                Не удалось загрузить профиль
            </Typography>
        );
    }

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 4, borderRadius: 3 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar
                        src={user.photoUrl}
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h5" fontWeight={600}>
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {user.username} | {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        Зарегистрирован: {new Date(user.registrationDate).toLocaleDateString()}
                    </Typography>

                    {user.drivingLicense && (
                        <Box mt={2} width="100%">
                            <Typography variant="subtitle2" fontWeight={500} mb={1}>
                                Водительское удостоверение:
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {user.drivingLicense.categories.map((cat) => (
                                    <Chip key={cat.id} label={cat.code} color="primary" />
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}