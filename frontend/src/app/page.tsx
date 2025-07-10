'use client';
import { Container, Button, Typography, Box, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';


export default function WelcomePage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: '100vh',         // full viewport height
        display: 'flex',
        justifyContent: 'center',  
        alignItems: 'center',     // center vertically
        bgcolor: 'primary.main',
        overflow: 'hidden',       // hide any accidental overflow
      }}
    >
     <Box
       sx={{
          position: 'absolute',  // make it full width ignoring parent's padding/margins
          top: '25.5%',
          left: 0,
          right: 0,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 3,
          textAlign: 'center',
        }}
    >
      <Paper sx={{ p: 10, width: '100%' }} elevation={3}>
        <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h1" marginBottom='2%'>
            Budget Tracker RAG App
          </Typography>
          <Typography variant="h3" gutterBottom color="text.secondary">
            Upload your CSV, ask natural language questions, and get insights instantly.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/upload')}
            sx={{ mt: 4 }}
          >
            Get Started
          </Button>
        </motion.div>
      </Paper>
    </Box>
  </Box>
  );
}