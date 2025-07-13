'use client';
import { Container, Button, Typography, Box, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';


export default function WelcomePage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'primary.main',
        px: 2,
        overflow: 'hidden',  // prevent scrollbars here too
      }}
    >
      <Paper
        sx={{
          p: 15,               // reduce padding a bit
          width: '100%',
          boxSizing: 'border-box',
          textAlign: 'center',
          maxHeight: '90vh',  // don't let paper grow beyond viewport
          overflowY: 'hidden',  // allow scrolling inside paper if needed
        }}
        elevation={3}
      >
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
  );
}