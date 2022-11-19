import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

function LineChart(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const [labels, setLabels] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  useEffect(() => {
    setLabels(props.labels);
    setData1(props.data1);
    setData2(props.data2);
  });

  const Data = {
    labels,
    datasets: [
      {
        label: props.label1,
        data: data1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: props.label2,
        data: data2,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Box sx={{ bgcolor: "white", m: 1, p: 2, borderRadius: "3%" }}>
        <Line data={Data} options={options} />
      </Box>
    </div>
  );
}

export default LineChart;
