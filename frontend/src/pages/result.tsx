'use client';
import { Paper, Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Result() {
  const [answer, setAnswer] = useState('');
  const router = useRouter();

  useEffect(() => {
    setAnswer(sessionStorage.getItem('result') || '');
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'primary.main',
        px: 2,
        overflow: 'hidden',
      }}
    >
      <Paper
        sx={{
          p: 10,
          width: '100%',
          boxSizing: 'border-box',
          textAlign: 'center',
          maxHeight: '90vh',
          overflowY: 'hidden',
        }}
        elevation={3}
      >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h4" gutterBottom>
          Result
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
          {answer}
        </Typography>
        <Button variant="outlined" sx={{ mt: 5, mr: 2 }} onClick={() => router.push('/ask')}>
          Ask Another
        </Button>
        <Button variant="contained" sx={{ mt: 5 }} onClick={() => router.push('/upload')}>
          New Upload
        </Button>
      </motion.div>
    </Paper>
    </Box>
  );
}