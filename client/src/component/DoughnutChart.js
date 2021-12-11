import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import { ArcElement } from 'chart.js'
import { Typography } from '@mui/material';

const DoughnutChart = ({ label, data }) => {
    const shuffled = [
        "#EF5350",
        "#EC407A",
        "#AB47BC",
        "#7E57C2",
        "#5C6BC0",
        "#42A5F5",
        "#26A69A",
        "#66BB6A",
        "#9CCC65",
        "#FFEE58",
        "#FFA726",
        "#8D6E63",
        "#78909C",
    ].sort(() => Math.random() - 0.5)
    return (
        <>
            <Typography component={"body"} textAlign={"center"} variant='button'>{label}</Typography>
            <Doughnut
                data={{
                    labels: data.map(el => el.label),
                    datasets: [
                        {
                            label: "Population (millions)",
                            backgroundColor: shuffled,
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