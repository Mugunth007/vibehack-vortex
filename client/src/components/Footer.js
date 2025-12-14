import React from 'react';
import { Box, Typography, Divider, Container } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'transparent',
                textAlign: 'center',
                width: '100%',
                mt: 'auto',
                py: 2
            }}
        >
            <Container>
                <Divider sx={{ mb: 2, borderColor: '#1e293b' }} />
            </Container>
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Decoy Security Inc.
            </Typography>
        </Box>
    );
};

export default Footer;
