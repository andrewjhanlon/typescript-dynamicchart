// MINERVA TEST CODING EXERCISE
// AUTHOR: ANDREW HANLON
// 2022-04-01
import React, { useState } from "react";
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';

import dynamic from 'next/dynamic';

const Plot = dynamic(
    () => import('react-plotly.js'),
    { ssr: false }
)

const Home: NextPage = () => {

  // Below would normally live in a seperate State file and be imported in:
      const markerSizeDefaultVal = 15;
    // Drop down selection value:
      const [selectAxis_Value, setValue] = useState('');
      const handleChange_selectAxis = e => setValue(e.target.value);
    // Slider value:
      let [moveMarksSizeSlider_Value, setValue2] = useState(markerSizeDefaultVal);
      const handleChange_moveMarksSizeSlider = e => setValue2(e.target.value);
    // Constants
      const volumeLabel = 'Volume (m3)';
      const weightLabel = 'Weight (kg)';
      const markerColor = 'red';
      const markerSizeLBound = 0;
      const markerSizeUBound = 40;
      let volumeArrayData = [ 1, 1.5, 2, 1.2, 3 ];
      let weightArrayData = [ 2, 7, 5, 6, 3 ];
    // Handle out of bounds values input:
      if(moveMarksSizeSlider_Value > markerSizeUBound || 
        moveMarksSizeSlider_Value < markerSizeLBound
      )
      {
        moveMarksSizeSlider_Value = markerSizeLBound;
      }

      // Pass the value to Plotly:
      const markerSize = moveMarksSizeSlider_Value;

    // Declare chart axes labels:
      let xAxisLabel : string = '';
      let yAxisLabel : string = '';
    // Declare arrays for each axis:
      let xAxisArray = [];
      let yAxisArray = [];

    // Handle user selection of the axis:
      switch(selectAxis_Value) { 
        case 'X_Volume': { 
          xAxisLabel = volumeLabel;
          yAxisLabel = weightLabel;
          xAxisArray = volumeArrayData;
          yAxisArray = weightArrayData;
          break; 
        } 
        case 'X_Weight': { 
          xAxisLabel = weightLabel;
          yAxisLabel = volumeLabel;
          xAxisArray = weightArrayData;
          yAxisArray = volumeArrayData;
          break; 
        } 
        default: { 
          xAxisLabel = volumeLabel;
          yAxisLabel = weightLabel;
          xAxisArray = volumeArrayData;
          yAxisArray = weightArrayData;
          break; 
        } 
      } 


    // Main body:
      // Would normally be divvied up into seperate component module files, but not enough time.
      return (
      <div className={styles.container}>
            <Head>
              <title>Minerva Plot</title>
              <meta name="plot" content="" />
              <link rel="icon" href="/Minervalogo.webp" />
            </Head>

            <main className={styles.main}>
              <Card sx={{ minWidth: '95%' }} className={styles.card_borderoverride_black}>
                {/* Close-button on right */}
                <Box sx={{ float: 'right' }}>
                  <Typography sx={{ fontSize: 'xxx-large', marginRight: '1rem' }} component="h1">&times;</Typography>
                </Box>
                {/* Minerva image at top */}
                <CardMedia
                  component="img"
                  alt="minerva logo"
                  image="/Minervalogo.webp"
                  sx={{ width: '50%' }}
                />
                <CardContent>
                  <Typography sx={{ color: 'red' }} className={styles.card_title1} gutterBottom component="div">
                    <p>
                      1) Initially configured for viewing on smaller screen, e.g. iPad.<br />
                      2) Plotly auto-resizing / scaling not configured yet.<br />
                    </p>
                  </Typography>
                  <br />
                  <Typography className={styles.card_title1} gutterBottom component="div">React dialogue plot</Typography>

                      {/* X-Y plot area */}
                      <Card sx={{ minWidth: '95%', height: '14vh' }} className={styles.card_borderoverride_red}>
                        <CardContent>
                          <InputLabel className={styles.card_title2} id="select-axis-label">Select X-Y plot data:</InputLabel>
                          <Select sx={{ minWidth: '85%' }} 
                            labelId="select-axis-label"
                            id="selectAxis"
                            label="AxisChosen"
                            onChange={handleChange_selectAxis}
                            defaultValue={'X_Volume'}
                          >
                            <MenuItem value={'X_Volume'}>Y=Weight X=Volume</MenuItem>
                            <MenuItem value={'X_Weight'}>Y=Volume X=Weight</MenuItem>
                          </Select>
                        </CardContent>
                      </Card>
                      <br />

                      {/* Chart area */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex' }}>
                          <Box sx={{ display: 'inline-block' }} className={styles.card_title3}>{yAxisLabel}</Box>
                          <Box sx={{ display: 'inline-block', minWidth: '85%' }}>
                            <Card sx={{ height: '30vh'}} className={styles.card_borderoverride_red}>
                              <CardContent>
                              {/* Plotly */}
                                    <Plot
                                      data={[
                                        {
                                          x: xAxisArray,
                                          y: yAxisArray,
                                          type: 'scatter',
                                          mode: 'markers',
                                          marker: {color: markerColor, size: markerSize},
                                        }
                                      ]}
                                      layout={ {width: 550, height: 300, title: 'Boxes available' }}
                                    />
                              </CardContent>
                            </Card>
                          </Box>
                        </Box>
                        {/* X-Axis label */}
                        <Box sx={{ textAlign: 'center'}}>
                          <Typography className={styles.card_title2} gutterBottom component="div">{xAxisLabel}</Typography>
                        </Box>
                      </Box>
                      <br />

                      {/* Marker size slider */}
                      <Box>
                        <Card sx={{ minWidth: '95%', height: '20vh'}} className={styles.card_borderoverride_red}>
                          <CardContent>
                            <Typography className={styles.card_title2} gutterBottom component="div">Point size:</Typography>
                            <TextField
                              id="standard-number"
                              label="Override value"
                              value={moveMarksSizeSlider_Value}
                              onChange={handleChange_moveMarksSizeSlider}
                              type="number"
                              className={styles.textField}
                              InputLabelProps={{
                              shrink: true,
                              }}
                              margin="normal"
                            />
                            <Typography className={styles.card_title2} gutterBottom component="div">Select point size:</Typography>
                            <Slider
                                aria-label="MarkerSize"
                                defaultValue={markerSizeDefaultVal}
                                valueLabelDisplay="on"
                                step={5}
                                min={markerSizeLBound}
                                max={markerSizeUBound}
                                marks={true}
                                onChange={handleChange_moveMarksSizeSlider}
                            />
                          </CardContent>
                        </Card>
                      </Box>

                </CardContent>
              </Card>
            </main>

            {/* For fun */}
            <footer className={styles.footer}>
                Powered by{' Andy!'}
                <span className={styles.logo}>
                  <a href="https://minervaintelligence.com/" target="_blank">
                    <Image src="/Minervalogo.webp" alt="Minerva Logo" width={72} height={16} />
                  </a>
                </span>
            </footer>
          </div>
        )
      }

export default Home
