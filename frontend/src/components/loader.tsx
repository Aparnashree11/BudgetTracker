'use client';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function AnimatedLoader() {
  return (
    <Box
      sx={{
        height: '98vh',
        bgcolor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'primary.contrastText',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{
              y: [0, -20, 0],
              backgroundColor: ['#90caf9', '#ffffff', '#90caf9'],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 0.1,
              delay: i * 0.2, // stagger between dots
            }}
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: '#90caf9',
            }}
          />
        ))}
      </Box>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Crunching your data...
      </Typography>
    </Box>
  );
}
