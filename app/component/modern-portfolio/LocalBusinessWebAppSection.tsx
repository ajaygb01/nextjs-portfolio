import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Container, Theme } from '@mui/material';

interface Props {
  currentTheme: Theme;
  onGetStartedClick: () => void;
}

const LocalBusinessWebAppSection: React.FC<Props> = ({ currentTheme, onGetStartedClick }) => {
  return (
    <Box sx={{ py: 8, backgroundColor: currentTheme.palette.background.default }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ color: currentTheme.palette.text.primary, fontWeight: 600 }}
        >
          Web Applications for Local Businesses
        </Typography>
        <Typography
          variant="h5"
          component="p"
          align="center"
          sx={{ color: currentTheme.palette.text.secondary, mb: 6, fontWeight: 400 }}
        >
          I help local businesses build powerful and simple web apps to grow online.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Starter Tier */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: currentTheme.palette.background.paper,
              color: currentTheme.palette.text.primary,
              borderRadius: 2,
              boxShadow: currentTheme.shadows ? currentTheme.shadows[3] : '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ color: currentTheme.palette.text.primary, fontWeight: 500 }}>
                  Starter
                </Typography>
                <Typography variant="h4" component="p" align="center" sx={{ mb: 1, color: currentTheme.palette.primary.main, fontWeight: 600 }}>
                  $150
                </Typography>
                <Typography variant="subtitle1" component="p" align="center" sx={{ color: currentTheme.palette.text.secondary, mb: 2 }}>
                  One-time
                </Typography>
                <Box component="ul" sx={{ pl: 0, listStyle: 'none', textAlign: 'center' }}>
                  <Typography component="li" variant="body1" sx={{ color: currentTheme.palette.text.secondary }}>Static website (3 pages)</Typography>
                  <Typography component="li" variant="body1" sx={{ color: currentTheme.palette.text.secondary }}>Mobile-friendly</Typography>
                  <Typography component="li" variant="body1" sx={{ color: currentTheme.palette.text.secondary }}>Contact form</Typography>
                </Box>
              </CardContent>
              <Box sx={{ p: 2, mt: 'auto' }}>
                <Typography variant="subtitle2" align="center" sx={{ color: currentTheme.palette.text.secondary }}>
                  Delivery: 24 hrs
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Professional Tier */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: currentTheme.palette.background.paper,
              color: currentTheme.palette.text.primary,
              borderRadius: 2,
              boxShadow: currentTheme.shadows ? currentTheme.shadows[3] : '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ color: currentTheme.palette.text.primary, fontWeight: 500 }}>
                  Professional
                </Typography>
                <Typography variant="h4" component="p" align="center" sx={{ mb: 1, color: currentTheme.palette.primary.main, fontWeight: 600 }}>
                  $350
                </Typography>
                <Typography variant="subtitle1" component="p" align="center" sx={{ color: currentTheme.palette.text.secondary, mb: 2 }}>
                  One-time
                </Typography>
                <Box component="ul" sx={{ pl: 0, listStyle: 'none', textAlign: 'center' }}>
                  <Typography component="li" variant="body1" sx={{ color: currentTheme.palette.text.secondary }}>Dynamic website with admin panel</Typography>
                  <Typography component="li" variant="body1" sx={{ color: currentTheme.palette.text.secondary }}>Firebase or Supabase backend</Typography>
                  <Typography component="li" variant="body1" sx={{ color: currentTheme.palette.text.secondary }}>Update content without code</Typography>
                </Box>
              </CardContent>
              <Box sx={{ p: 2, mt: 'auto' }}>
                <Typography variant="subtitle2" align="center" sx={{ color: currentTheme.palette.text.secondary }}>
                  Delivery: 48 hrs
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Premium Tier */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: currentTheme.palette.background.paper,
              color: currentTheme.palette.text.primary,
              borderRadius: 2,
              boxShadow: currentTheme.shadows ? currentTheme.shadows[3] : '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h3" gutterBottom align="center" sx={{ color: currentTheme.palette.text.primary, fontWeight: 500 }}>
                  Premium
                </Typography>
                <Typography variant="h4" component="p" align="center" sx={{ mb: 1, color: currentTheme.palette.primary.main, fontWeight: 600 }}>
                  $750+
                </Typography>
                <Typography variant="subtitle1" component="p" align="center" sx={{ color: currentTheme.palette.text.secondary, mb: 2 }}>
                  {/* Intentionally blank or could add a note like "Custom Quote" */}
                </Typography>
                <Box component="ul" sx={{ pl: 0, listStyle: 'none', textAlign: 'center' }}>
                  <Typography component="li" variant="body1" sx={{ color: currentTheme.palette.text.secondary }}>Full-stack app (e-commerce, booking, dashboard, etc.)</Typography>
                  <Typography component="li" variant="body1" sx={{ color: currentTheme.palette.text.secondary }}>Hosting + SEO + Performance optimization</Typography>
                  <Typography component="li" variant="body1" sx={{ color: currentTheme.palette.text.secondary }}>Maintenance plan optional</Typography>
                </Box>
              </CardContent>
              <Box sx={{ p: 2, mt: 'auto' }}>
                <Typography variant="subtitle2" align="center" sx={{ color: currentTheme.palette.text.secondary }}>
                  Delivery: Custom timeline
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" size="large" onClick={onGetStartedClick}>
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LocalBusinessWebAppSection;
