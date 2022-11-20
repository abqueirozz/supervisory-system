import { useEffect, createRef } from 'react'
import zoomPlugin from 'chartjs-plugin-zoom';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);


// CONFIG
var chartReference = createRef("current");

export function ChartLine({ state, colorLine, labelX, labelY }) {
  
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          text: labelX,
          display: true,
          color: "#FFF"
        },
        ticks: {
          color: "white"
        },
        grid: {
          display: false
        }
      }
      ,
      y: {
        title: {
          text: labelY,
          display: true,
          color: "#FFF"
        },
        ticks: {
          color: "white"
        },
        grid: { display: false }
      }
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      zoom: {
        zoom: {
          drag: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        }
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  const labels = [0, 1, 2, 3];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [4, 5, 8, 2],
        borderColor: colorLine,
        backgroundColor: 'white',
        pointBorderColor: "#FFF",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        tension: 0.2
      }
    ],
  };

  var chart = chartReference.current;

  useEffect(() => {
    chart = chartReference.current;
    chart.data.datasets[0].data.push(Number(state))
    chart.data.labels.push(Number(state))
    chart.data.labels = chart.data.labels.fill(chart.data.labels.length + 1).map((el, index) => { return index })

    chart.update()
  }, [state])

  return (
    <>
      <button className='resetButton' onClick={() => { return chart.resetZoom() }}>Reset Zoom</button>
      <div className='chart-displayed'>
        <Line id='current' ref={chartReference} options={options} data={data} />
      </div>
    </>
  )
}
