import React from 'react'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
   
    footer: {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.white,
      zIndex: '1'
    }
  }));
export default function Footer() {
    const classes = useStyles();
    return (
        <div>
              <Box py={4} px={8} className={classes.footer}>

                  <Grid container direction='row' justifyContent='center'>
                      <Grid item >
                          <Typography variant='body1'>
                          © 2022 Quadrant Resource
                          </Typography>
                      </Grid>
                  </Grid>
        
        </Box>
            
        </div>
    )
}
