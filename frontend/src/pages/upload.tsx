'use client';
import { Typography, Button, Box, Input, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('table_name', 'expenses');

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload-csv`, {
      method: 'POST',
      body: formData,
    });

    router.push('/ask');
  };

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
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ m: 0, mb: 10 }}>
            Upload CSV
          </Typography>
          <Input
            type="file"
            inputProps={{ accept: '.csv,text/csv' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" sx={{ml: 3}} disabled={!file} onClick={handleUpload}>
            Upload and Continue
          </Button>
        </motion.div>
      </Paper>
    </Box>
  );
}