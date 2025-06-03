const unpack = (data, key) => data.map(row => row[key]);

function plotQ1Charts() {
  const mapDiv = document.getElementById("q1_gtVsPMV");
  if (!mapDiv) return;

  d3.csv("q1WeeklyAvg.csv").then(ieq_data => {
    const gt = unpack(ieq_data, "avg_tg");
    const pmv = unpack(ieq_data, "avg_pmv");
    const ppd = unpack(ieq_data, "avg_ppd");

    let trace1 = {
      x: gt,
      y: pmv,
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 12,
        color: ppd,
        colorscale: [
          [0, 'green'],
          [0.5, 'yellow'],
          [1, 'red']
        ],
        colorbar: {
          title: 'PPD (%)',
          titleside: 'right'
        },
        showscale: true
      },
      hovertemplate:
        "<b>Globe Temp:</b> %{x}°C<br>" +
        "<b>PMV:</b> %{y}<br>" +
        "<b>PPD:</b> %{marker.color:.2f}%<br><extra></extra>"
    };

    let layout = {
      xaxis: {
        title: 'Globe Temperature (°C)'
      },
      yaxis: {
        title: 'Predicted Mean Value (PMV)'
      },
      margin: { t: 50, l: 60, r: 40, b: 60 },
      shapes: [
        {
          type: 'line',
          xref: 'paper',
          x0: 0,
          x1: 1,
          yref: 'y',
          y0: -0.61,
          y1: -0.61,
          line: { color: 'black', width: 2, dash: 'dot' }
        },
        {
          type: 'line',
          xref: 'paper',
          x0: 0,
          x1: 1,
          yref: 'y',
          y0: 0.23,
          y1: 0.23,
          line: { color: 'black', width: 2, dash: 'dot' }
        }
      ],
      annotations: [
        {
          xref: 'paper', x: 1, yref: 'y', y: -0.61,
          text: 'Men Productive PMV', showarrow: false, xanchor: 'left',
          font: { color: 'black', size: 12 },
          bgcolor: 'rgba(255,255,255,0.8)', borderpad: 2
        },
        {
          xref: 'paper', x: 1, yref: 'y', y: 0.23,
          text: 'Women Productive PMV', showarrow: false, xanchor: 'left',
          font: { color: 'black', size: 12 },
          bgcolor: 'rgba(255,255,255,0.8)', borderpad: 2
        }
      ]
    };

    Plotly.newPlot(mapDiv, [trace1], layout);
  });

  const mapDiv2 = document.getElementById("q1_avgGT");

  d3.csv("q1WeeklyAvg.csv").then(gt_data => {
    const week = unpack(gt_data, "week");
    const gt = unpack(gt_data, "avg_tg");

    let trace2 = {
      x: week,
      y: gt,
      mode: "lines+markers",
      type: "line",
      hovertemplate:
        "<b>Week:</b> %{x}<br>" +
        "<b>Global Temp:</b> %{y}°C<br><extra></extra>"
    };

    let layout2 = {
      xaxis: {
        title: 'Weekly Timeline (January - March)'
      },
      yaxis: {
        title: 'Globe Temperature (°C)'
      },
      margin: {
        t: 50,
        l: 60,
        r: 40,
        b: 60
      }
    };

    Plotly.newPlot(mapDiv2, [trace2], layout2);
  });
}

function plotQ2Charts() {
  const mapDiv3 = document.getElementById("q2_gtVsPMV");
  if (!mapDiv3) return;

  d3.csv("q2WeeklyAvg.csv").then(ieq_data => {
    const gt = unpack(ieq_data, "avg_tg");
    const pmv = unpack(ieq_data, "avg_pmv");
    const ppd = unpack(ieq_data, "avg_ppd");

    let trace3 = {
      x: gt,
      y: pmv,
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 12,
        color: ppd,
        colorscale: [
          [0, 'green'],
          [0.5, 'yellow'],
          [1, 'red']
        ],
        colorbar: {
          title: 'PPD (%)',
          titleside: 'right'
        },
        showscale: true
      },
      hovertemplate:
        "<b>Globe Temp:</b> %{x}°C<br>" +
        "<b>PMV:</b> %{y}<br>" +
        "<b>PPD:</b> %{marker.color:.2f}%<br><extra></extra>"
    };

    let layout = {
      xaxis: {
        title: 'Globe Temperature (°C)'
      },
      yaxis: {
        title: 'Predicted Mean Value (PMV)'
      },
      margin: { t: 50, l: 60, r: 40, b: 60 },
      shapes: [
        {
          type: 'line', xref: 'paper', x0: 0, x1: 1,
          yref: 'y', y0: -0.61, y1: -0.61,
          line: { color: 'black', width: 2, dash: 'dot' }
        },
        {
          type: 'line', xref: 'paper', x0: 0, x1: 1,
          yref: 'y', y0: 0.23, y1: 0.23,
          line: { color: 'black', width: 2, dash: 'dot' }
        }
      ],
      annotations: [
        {
          xref: 'paper', x: 1, yref: 'y', y: -0.61,
          text: 'Men Productive PMV', showarrow: false, xanchor: 'left',
          font: { color: 'black', size: 12 },
          bgcolor: 'rgba(255,255,255,0.8)', borderpad: 2
        },
        {
          xref: 'paper', x: 1, yref: 'y', y: 0.23,
          text: 'Women productive PMV', showarrow: false, xanchor: 'left',
          font: { color: 'black', size: 12 },
          bgcolor: 'rgba(255,255,255,0.8)', borderpad: 2
        }
      ]
    };

    Plotly.newPlot(mapDiv3, [trace3], layout);
  });

  const mapDiv4 = document.getElementById("q2_avgGT");

  d3.csv("q2WeeklyAvg.csv").then(gt_data => {
    const week = unpack(gt_data, "week");
    const gt = unpack(gt_data, "avg_tg");

    let trace4 = {
      x: week,
      y: gt,
      mode: "lines+markers",
      type: "line",
      hovertemplate:
        "<b>Week:</b> %{x}<br>" +
        "<b>Global Temp:</b> %{y}°C<br><extra></extra>"
    };

    let layout2 = {
      xaxis: {
        title: 'Weekly Timeline (April to June)'
      },
      yaxis: {
        title: 'Globe Temperature (°C)'
      },
      margin: {
        t: 50,
        l: 60,
        r: 40,
        b: 60
      }
    };

    Plotly.newPlot(mapDiv4, [trace4], layout2);
  });
}



function plotQ3Charts() {
  const mapDiv5 = document.getElementById("q3_gtVsPMV");

  d3.csv("q3WeeklyAvg.csv").then(ieq_data => {
    const gt = unpack(ieq_data, "avg_tg");
    const pmv = unpack(ieq_data, "avg_pmv");
    const ppd = unpack(ieq_data, "avg_ppd")

    let trace5 = {
      x: gt,
      y: pmv,
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 12,
        color: ppd,
        colorscale: [
          [0, 'green'],
          [0.5, 'yellow'],
          [1, 'red']
        ],
        colorbar: {
          title: 'PPD (%)',
          titleside: 'right'
        },
        showscale: true
      },
      hovertemplate:
        "<b>Globe Temp:</b> %{x}°C<br>" +
        "<b>PMV:</b> %{y}<br>" +
        "<b>PPD:</b> %{marker.color:.2f}%<br><extra></extra>"
    };

    let layout = {
      xaxis: {
        title: 'Globe Temperature (°C)'
      },
      yaxis: {
        title: 'Predicted Mean Value (PMV)'
      },
      margin: {
        t: 50,
        l: 60,
        r: 40,
        b: 60
      },
      shapes: [
        {
          type: 'line',
          xref: 'paper',   // Use paper coordinates for x-axis
          x0: 0,           // start at left edge
          x1: 1,           // end at right edge
          yref: 'y',       // Use data coordinates for y-axis
          y0: -0.61,
          y1: -0.61,
          line: {
            color: 'black',
            width: 2,
            dash: 'dot'
          }
        },
        {
          type: 'line',
          xref: 'paper',   // Use paper coordinates for x-axis
          x0: 0,           // start at left edge
          x1: 1,           // end at right edge
          yref: 'y',       // Use data coordinates for y-axis
          y0: 0.23,
          y1: 0.23,
          line: {
            color: 'black',
            width: 2,
            dash: 'dot'
          }
        }
      ],
      annotations: [
        {
          xref: 'paper',     // position relative to the whole plot width
          x: 1,              // position at the right edge (1 = 100%)
          yref: 'y',         // data coordinates for y axis
          y: -0.61,          // same as your line y position
          text: 'men productive PMV',  // your label text
          showarrow: false,  // no arrow, just text
          xanchor: 'left',   // text starts just right of x=1 (right edge)
          font: {
            color: 'black',
            size: 12
          },
          bgcolor: 'rgba(255,255,255,0.8)', // optional: white background with some transparency
          borderpad: 2
        },
        {
          xref: 'paper',     // position relative to the whole plot width
          x: 1,              // position at the right edge (1 = 100%)
          yref: 'y',         // data coordinates for y axis
          y: .23,          // same as your line y position
          text: 'Women productive PMV',  // your label text
          showarrow: false,  // no arrow, just text
          xanchor: 'left',   // text starts just right of x=1 (right edge)
          font: {
            color: 'black',
            size: 12
          },
          bgcolor: 'rgba(255,255,255,0.8)', // optional: white background with some transparency
          borderpad: 2
        }
      ]

    };

    Plotly.newPlot(mapDiv5, [trace5], layout);
  });



  const mapDiv6 = document.getElementById("q3_avgGT");

  d3.csv("q3WeeklyAvg.csv").then(gt_data => {
    const week = unpack(gt_data, "week");
    const gt = unpack(gt_data, "avg_tg");

    let trace6 = {
      x: week,
      y: gt,
      mode: "lines+markers",
      type: "line",
      hovertemplate:
        "<b>Week:</b> %{x}<br>" +
        "<b>Global Temp:</b> %{y}°C<br><extra></extra>"
    };

    let layout2 = {
      xaxis: {
        title: 'Weekly Timeline (July to September)'
      },
      yaxis: {
        title: 'Globe Temperature (°C)'
      },
      margin: {
        t: 50,
        l: 60,
        r: 40,
        b: 60
      }
    };

    Plotly.newPlot(mapDiv6, [trace6], layout2);
  });
}



function plotQ4Charts() {
  const mapDiv7 = document.getElementById("q4_gtVsPMV");

  d3.csv("q4WeeklyAvg.csv").then(ieq_data => {
    const gt = unpack(ieq_data, "avg_tg");
    const pmv = unpack(ieq_data, "avg_pmv");
    const ppd = unpack(ieq_data, "avg_ppd")

    let trace7 = {
      x: gt,
      y: pmv,
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 12,
        color: ppd,
        colorscale: [
          [0, 'green'],
          [0.5, 'yellow'],
          [1, 'red']
        ],
        colorbar: {
          title: 'PPD (%)',
          titleside: 'right'
        },
        showscale: true
      },
      hovertemplate:
        "<b>Globe Temp:</b> %{x}°C<br>" +
        "<b>PMV:</b> %{y}<br>" +
        "<b>PPD:</b> %{marker.color:.2f}%<br><extra></extra>"
    };

    let layout = {
      xaxis: {
        title: 'Globe Temperature (°C)'
      },
      yaxis: {
        title: 'Predicted Mean Value (PMV)'
      },
      margin: {
        t: 50,
        l: 60,
        r: 40,
        b: 60
      },
      shapes: [
        {
          type: 'line',
          xref: 'paper',   // Use paper coordinates for x-axis
          x0: 0,           // start at left edge
          x1: 1,           // end at right edge
          yref: 'y',       // Use data coordinates for y-axis
          y0: -0.61,
          y1: -0.61,
          line: {
            color: 'black',
            width: 2,
            dash: 'dot'
          }
        },
        {
          type: 'line',
          xref: 'paper',   // Use paper coordinates for x-axis
          x0: 0,           // start at left edge
          x1: 1,           // end at right edge
          yref: 'y',       // Use data coordinates for y-axis
          y0: 0.23,
          y1: 0.23,
          line: {
            color: 'black',
            width: 2,
            dash: 'dot'
          }
        }
      ],
      annotations: [
        {
          xref: 'paper',     // position relative to the whole plot width
          x: 1,              // position at the right edge (1 = 100%)
          yref: 'y',         // data coordinates for y axis
          y: -0.61,          // same as your line y position
          text: 'Men Productive PMV',  // your label text
          showarrow: false,  // no arrow, just text
          xanchor: 'left',   // text starts just right of x=1 (right edge)
          font: {
            color: 'black',
            size: 12
          },
          bgcolor: 'rgba(255,255,255,0.8)', // optional: white background with some transparency
          borderpad: 2
        },
        {
          xref: 'paper',     // position relative to the whole plot width
          x: 1,              // position at the right edge (1 = 100%)
          yref: 'y',         // data coordinates for y axis
          y: .23,          // same as your line y position
          text: 'Women Productive PMV',  // your label text
          showarrow: false,  // no arrow, just text
          xanchor: 'left',   // text starts just right of x=1 (right edge)
          font: {
            color: 'black',
            size: 12
          },
          bgcolor: 'rgba(255,255,255,0.8)', // optional: white background with some transparency
          borderpad: 2
        }
      ]

    };

    Plotly.newPlot(mapDiv7, [trace7], layout);
  });



  const mapDiv8 = document.getElementById("q4_avgGT");

  d3.csv("q4WeeklyAvg.csv").then(gt_data => {
    const week = unpack(gt_data, "week");
    const gt = unpack(gt_data, "avg_tg");

    let trace8 = {
      x: week,
      y: gt,
      mode: "lines+markers",
      type: "line",
      hovertemplate:
        "<b>Week:</b> %{x}<br>" +
        "<b>Global Temp:</b> %{y}°C<br><extra></extra>"
    };

    let layout2 = {
      xaxis: {
        title: 'Weekly Timeline (October to December)'
      },
      yaxis: {
        title: 'Globe Temperature (°C)'
      },
      margin: {
        t: 50,
        l: 60,
        r: 40,
        b: 60
      }
    };

    Plotly.newPlot(mapDiv8, [trace8], layout2);
  });
}


window.onload = () => {
  // Set the dropdown values to match the initial content
  document.querySelector('.leftSide .dropdown').value = 'model3';
  document.querySelector('.rightSide .dropdown').value = 'model4';

  // Load the initial content
  changeContent("leftSide", "model3");
  changeContent("rightSide", "model4");
};

// Content Changer
function changeContent(side, modelId) {
  const template = document.getElementById(modelId);
  const target = document.getElementById(side + "Content");

  if (template && target) {
    target.innerHTML = "";
    const clone = template.content.cloneNode(true);
    target.appendChild(clone);

    // Conditionally plot graphs
    if (modelId === "model1") {
      if (side === "leftSide" || side === "rightSide") {
        plotQ1Charts(); // Plot Q1 on either side
      }
    }

    if (modelId === "model2") {
      if (side === "leftSide" || side === "rightSide") {
        plotQ2Charts(); // Plot Q2 on either side
      }
    }

    if (modelId === "model3") {
      if (side === "leftSide" || side === "rightSide") {
        plotQ3Charts(); // Plot Q2 on either side
      }
    }

    if (modelId === "model4") {
      if (side === "leftSide" || side === "rightSide") {
        plotQ4Charts(); // Plot Q2 on either side
      }
    }
  }
}