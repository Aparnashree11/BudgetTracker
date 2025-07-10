'use client';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Loader from '../components/loader';

export default function Ask() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAsk = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('question', question);
    formData.append('table_name', 'expenses');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ask`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    sessionStorage.setItem('result', data.answer);
    setLoading(false);
    router.push('/result');
  };

  if (loading) {
    return <Loader />;
  }

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
          maxWidth: 600,
          boxSizing: 'border-box',
          textAlign: 'center',
          maxHeight: '90vh',
          overflowY: 'hidden',
        }}
        elevation={3}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ m: 0, mb: 6 }}>
            Ask a Question
          </Typography>
          <TextField
            fullWidth
            label="Ask something about your data"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            variant="outlined"
            sx={{ mt: 3 }}
          />
          <Button variant="contained" onClick={handleAsk} disabled={!question} sx={{ mt: 4 }} fullWidth>
            Submit
          </Button>
        </motion.div>
      </Paper>
    </Box>
  );
}