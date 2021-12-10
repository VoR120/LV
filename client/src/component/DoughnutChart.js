import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import { ArcElement } from 'chart.js'
import { Typography } from '@mui/material';

const DoughnutChart = ({ label, data }) => {
    return (
        <>
            <Typography component={"body"} textAlign={"center"} variant='button'>{label}</Typography>
            <Doughnut
                data={{
                    labels: data.map(el => el.label),
                    datasets: [
                        {
                            label: "Population (millions)",
                            backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850"
                            ],
                            data: data.map(el => el.quantity)
                        }
                    ]
                }}
                option={{
                    title: {
                        display: true,
                        text: "Predicted world population (millions) in 2050"
                    }
                }}
            />
        </>
    );
};

export default DoughnutChart;