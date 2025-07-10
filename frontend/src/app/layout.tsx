'use client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { MotionConfig } from 'framer-motion';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#f50057' },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MotionConfig transition={{ duration: 0.5 }}>
            {children}
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}