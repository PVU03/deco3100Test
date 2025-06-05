// content Changer so when an option from dropdown is selected, it changes the content on the side that got changed. 
// had the help of ChatGPT to help me with this. Transcript in Appendix
function changeContent(side, modelId) {
  const template = document.getElementById(modelId);
  const target = document.getElementById(side + "Content");

  if (template && target) {
    target.innerHTML = "";
    const clone = template.content.cloneNode(true);
    target.appendChild(clone);

    // Plot charts based on modelId
    if (modelId === "model1") plotQ1Charts();
    else if (modelId === "model2") plotQ2Charts();
    else if (modelId === "model3") plotQ3Charts();
    else if (modelId === "model4") plotQ4Charts();

    // Determine the opposite side
    const oppositeSide = side === "leftSide" ? "rightSide" : "leftSide";

    // Get both dropdowns
    const sideDropdown = document.querySelector(`.${side} .dropdown`);
    const oppositeDropdown = document.querySelector(`.${oppositeSide} .dropdown`);

    // Enable all options on opposite dropdown first
    Array.from(oppositeDropdown.options).forEach(opt => {
      if (opt.value !== "warning") opt.disabled = false;
    });

    // Disable the currently selected option on the opposite dropdown
    const selectedValueOnThisSide = sideDropdown.value;
    if (selectedValueOnThisSide !== "warning") {
      const optionToDisable = oppositeDropdown.querySelector(`option[value="${selectedValueOnThisSide}"]`);
      if (optionToDisable) optionToDisable.disabled = true;
    }
  }
}



// upon opening the website, it will automatically load Q3 and Q4 on the left and right sides respectively
window.onload = () => {
  document.querySelector('.leftSide .dropdown').value = 'model3';
  document.querySelector('.rightSide .dropdown').value = 'model4';

  changeContent("leftSide", "model3");
  changeContent("rightSide", "model4");
};



// function to unpack data values based on the key in the top line
const unpack = (data, key) => data.map(row => row[key]);



// function to plot the charts for the first quarter
// each function is the same as this one, just the mapDiv and csv changed for their respective quarters
function plotQ1Charts() {
  // weekly Average TG for quarter 1
  const mapDiv2 = document.getElementById("q1_avgGT"); // finds <div> with id=q1_avgGT

  // function that calls q1WeeklyAvg.csv and turns it into data stored in gt_data
  d3.csv("q1WeeklyAvg.csv").then(gt_data => {
    const week = unpack(gt_data, "qweek");    // extracts week column from csv
    const gt = unpack(gt_data, "avg_tg");     // extracts avg_gt column from csv

    // data for chart
    let trace2 = {
      x: week,  // sets week as x axis data 
      y: gt,    // set gt as y axis data
      mode: "lines+markers",  // shows lines and data points
      type: "line", // sets chart type as line chart
      hovertemplate:  // hover template that shows the week and the average global temperature
        "<b>Week:</b> %{x}<br>" +
        "<b>Global Temp:</b> %{y}°C<br><extra></extra>"
    };

    // layout of chart
    let layout2 = {
      xaxis: {
        title: 'Weekly Timeline (January - March)' // name of x axis
      },
      yaxis: {
        title: 'Globe Temperature (°C)' // name of y axis
      },
      margin: { // margins of the chart
        t: 50,
        l: 60,
        r: 40,
        b: 60
      }
    };

    // config to remove the plotly controls and menu bar without removing the hover interactions. Couldn't use { staticPlot: true } as it wouldn't allow hover interactions
    let config = {
      scrollZoom: false,
      displayModeBar: false,
      staticPlot: false,
      responsive: true,
      doubleClick: false,
      displaylogo: false,
      modeBarButtonsToRemove: [
        'zoom2d',
        'pan2d',
        'select2d',
        'lasso2d',
        'zoomIn2d',
        'zoomOut2d',
        'autoScale2d',
        'resetScale2d'
      ]
    };

    Plotly.newPlot(mapDiv2, [trace2], layout2, config); //plots the chart in mapDiv1 using data from trace1 with the layout of layout and config of config
  });



  // TG vs PMV in relation to PPD chart for quarter 1
  const mapDiv = document.getElementById("q1_gtVsPMV");

  d3.csv("q1WeeklyAvg.csv").then(ieq_data => {
    const gt = unpack(ieq_data, "avg_tg");    // extracts avg_gt column from csv
    const pmv = unpack(ieq_data, "avg_pmv");  // extracts avg_pmv column from csv
    const ppd = unpack(ieq_data, "avg_ppd");  // extracts avg_ppd column from csv

    // data for chart
    let trace1 = {
      x: gt,  // sets gt data as x axis
      y: pmv, // sets pmv data as y axis
      mode: 'markers', // shows no lines, only points
      type: 'scatter', // sets type as scatter chart
      marker: { // styling of data points
        size: 12,
        color: ppd,
        colorscale: [ // colour scale for ppd data
          [0, 'green'],
          [0.5, 'yellow'],
          [1, 'red']
        ],
        colorbar: {   // sets colour scale bar for ppd
          title: 'PPD (%)',
          titleside: 'right'  // sets colour bar on the right side of the chart
        },
        showscale: true
      },
      hovertemplate:  // hover template that shows global temperature, pmv and ppd
        "<b>Globe Temp:</b> %{x}°C<br>" +
        "<b>PMV:</b> %{y}<br>" +
        "<b>PPD:</b> %{marker.color:.2f}%<br><extra></extra>"
    };

    // layout of chart
    let layout = {
      xaxis: {
        title: 'Globe Temperature (°C)' // name of x axis
      },
      yaxis: {
        title: 'Predicted Mean Value (PMV)' // name of y axis
      },
      margin: {  // margins of chart
        t: 50,
        l: 60,
        r: 40,
        b: 60
      },
      shapes: [ // for the two ideal pmv lines
        { // line for ideal male pmv
          type: 'line',
          xref: 'paper',
          x0: 0,
          x1: 1,
          yref: 'y',
          y0: -0.61,
          y1: -0.61,
          line: {
            color: 'black',
            width: 2,
            dash: 'dot'
          }
        },
        { // line for ideal female pmv
          type: 'line',
          xref: 'paper',
          x0: 0,
          x1: 1,
          yref: 'y',
          y0: 0.23,
          y1: 0.23,
          line: {
            color: 'black',
            width: 2,
            dash: 'dot'
          }
        }
      ],
      annotations: [ // anotations for the ideal pmv lines to label both
        { // annotation for ideal male pmv line
          xref: 'paper',
          x: 0,
          yref: 'y',
          y: -0.61,
          text: 'Ideal Men productive PMV',
          showarrow: false,
          xanchor: 'left',
          font: {
            color: 'black',
            size: 12
          },
          bgcolor: 'rgba(255,255,255,0.8)',
          borderpad: 2
        },
        { // annotation for ideal female pmv line
          xref: 'paper',
          x: 0,
          yref: 'y',
          y: .23,
          text: 'Ideal Women productive PMV',
          showarrow: false,
          xanchor: 'left',
          font: {
            color: 'black',
            size: 12
          },
          bgcolor: 'rgba(255,255,255,0.8)',
          borderpad: 2
        }
      ]
    };

    // config to remove the plotly controls and menu bar without removing the hover interactions. Couldn't use { staticPlot: true } as it wouldn't allow hover interactions
    let config = {
      scrollZoom: false,
      displayModeBar: false,
      staticPlot: false,
      responsive: true,
      doubleClick: false,
      displaylogo: false,
      modeBarButtonsToRemove: [
        'zoom2d',
        'pan2d',
        'select2d',
        'lasso2d',
        'zoomIn2d',
        'zoomOut2d',
        'autoScale2d',
        'resetScale2d'
      ]
    };

    Plotly.newPlot(mapDiv, [trace1], layout, config); //plots the chart in mapDiv1 using data from trace1 with the layout of layout and config of config
  });
}



// Function to plot the charts for the second quarter
function plotQ2Charts() {
  // Weekly Average TG for quarter 2
  const mapDiv4 = document.getElementById("q2_avgGT");

  d3.csv("q2WeeklyAvg.csv").then(gt_data => {
    const week = unpack(gt_data, "qweek");
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

    let config = {
      scrollZoom: false,
      displayModeBar: false,
      staticPlot: false,
      responsive: true,
      doubleClick: false,
      displaylogo: false,
      modeBarButtonsToRemove: [
        'zoom2d',
        'pan2d',
        'select2d',
        'lasso2d',
        'zoomIn2d',
        'zoomOut2d',
        'autoScale2d',
        'resetScale2d'
      ]
    };

    Plotly.newPlot(mapDiv4, [trace4], layout2, config);
  });



  // TG vs PMV in relation to PPD chart for quarter 2
  const mapDiv3 = document.getElementById("q2_gtVsPMV");

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
      margin: {
        t: 50,
        l: 60,
        r: 40,
        b: 60
      },
      shapes: [
        {
          type: 'line',
          xref: 'paper',
          x0: 0,
          x1: 1,
          yref: 'y',
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
          xref: 'paper',
          x0: 0,
          x1: 1,
          yref: 'y',
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
          xref: 'paper',
          x: 0,
          yref: 'y',
          y: -0.61,
          text: 'Ideal Men productive PMV',
          showarrow: false,
          xanchor: 'left',
          font: {
            color: 'black',
            size: 12
          },
          bgcolor: 'rgba(255,255,255,0.8)',
          borderpad: 2
        },
        {
          xref: 'paper',
          x: 0,
          yref: 'y',
          y: .23,
          text: 'Ideal Women productive PMV',
          showarrow: false,
          xanchor: 'left',
          font: {
            color: 'black',
            size: 12
          },
          bgcolor: 'rgba(255,255,255,0.8)',
          borderpad: 2
        }
      ]
    };

    let config = {
      scrollZoom: false,
      displayModeBar: false,
      staticPlot: false,
      responsive: true,
      doubleClick: false,
      displaylogo: false,
      modeBarButtonsToRemove: [
        'zoom2d',
        'pan2d',
        'select2d',
        'lasso2d',
        'zoomIn2d',
        'zoomOut2d',
        'autoScale2d',
        'resetScale2d'
      ]
    };

    Plotly.newPlot(mapDiv3, [trace3], layout, config);
  });
}



// Function to plot the charts for the third quarter
function plotQ3Charts() {
  // Weekly Average TG for quarter 3
  const mapDiv6 = document.getElementById("q3_avgGT");

  d3.csv("q3WeeklyAvg.csv").then(gt_data => {
    const week = unpack(gt_data, "qweek");
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

    let config = {
      scrollZoom: false,
      displayModeBar: false,
      staticPlot: false,
      responsive: true,
      doubleClick: false,
      displaylogo: false,
      modeBarButtonsToRemove: [
        'zoom2d',
        'pan2d',
        'select2d',
        'lasso2d',
        'zoomIn2d',
        'zoomOut2d',
        'autoScale2d',
        'resetScale2d'
      ]
    };

    Plotly.newPlot(mapDiv6, [trace6], layout2, config);
  });



  // TG vs PMV in relation to PPD chart for quarter 3
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
          xref: 'paper',
          x0: 0,
          x1: 1,
          yref: 'y',
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
          xref: 'paper',
          x0: 0,
          x1: 1,
          yref: 'y',
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
          xref: 'paper',
          x: 0,
          yref: 'y',
          y: -0.61,
          text: 'Ideal Men productive PMV',
          showarrow: false,
          xanchor: 'left',
          font: {
            color: 'black',
            size: 12
          },
          bgcolor: 'rgba(255,255,255,0.8)',
          borderpad: 2
        },
        {
          xref: 'paper',
          x: 0,
          yref: 'y',
          y: .23,
          text: 'Ideal Women productive PMV',
          showarrow: false,
          xanchor: 'left',
          font: {
            color: 'black',
            size: 12
          },
          bgcolor: 'rgba(255,255,255,0.8)',
          borderpad: 2
        }
      ]

    };

    let config = {
      scrollZoom: false,
      displayModeBar: false,
      staticPlot: false,
      responsive: true,
      doubleClick: false,
      displaylogo: false,
      modeBarButtonsToRemove: [
        'zoom2d',
        'pan2d',
        'select2d',
        'lasso2d',
        'zoomIn2d',
        'zoomOut2d',
        'autoScale2d',
        'resetScale2d'
      ]
    };

    Plotly.newPlot(mapDiv5, [trace5], layout, config);
  });
}



// Function to plot the charts for the fourth quarter
function plotQ4Charts() {
  // Weekly Average TG for quarter 4
  const mapDiv8 = document.getElementById("q4_avgGT");

  d3.csv("q4WeeklyAvg.csv").then(gt_data => {
    const week = unpack(gt_data, "qweek");
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

    let config = {
      scrollZoom: false,
      displayModeBar: false,
      staticPlot: false,
      responsive: true,
      doubleClick: false,
      displaylogo: false,
      modeBarButtonsToRemove: [
        'zoom2d',
        'pan2d',
        'select2d',
        'lasso2d',
        'zoomIn2d',
        'zoomOut2d',
        'autoScale2d',
        'resetScale2d'
      ]
    };

    Plotly.newPlot(mapDiv8, [trace8], layout2, config);
  });



  // TG vs PMV in relation to PPD chart for quarter 4
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
          xref: 'paper',
          x0: 0,
          x1: 1,
          yref: 'y',
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
          xref: 'paper',
          x0: 0,
          x1: 1,
          yref: 'y',
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
          xref: 'paper',
          x: 0,
          yref: 'y',
          y: -0.61,
          text: 'Ideal Men Productive PMV',
          showarrow: false,
          xanchor: 'left',
          font: {
            color: 'black',
            size: 12
          },
          bgcolor: 'rgba(255,255,255,0.8)',
          borderpad: 2
        },
        {
          xref: 'paper',
          x: 0,
          yref: 'y',
          y: .23,
          text: 'Ideal Women Productive PMV',
          showarrow: false,
          xanchor: 'left',
          font: {
            color: 'black',
            size: 12
          },
          bgcolor: 'rgba(255,255,255,0.8)',
          borderpad: 2
        }
      ]
    };

    let config = {
      scrollZoom: false,
      displayModeBar: false,
      staticPlot: false,
      responsive: true,
      doubleClick: false,
      displaylogo: false,
      modeBarButtonsToRemove: [
        'zoom2d',
        'pan2d',
        'select2d',
        'lasso2d',
        'zoomIn2d',
        'zoomOut2d',
        'autoScale2d',
        'resetScale2d'
      ]
    };

    Plotly.newPlot(mapDiv7, [trace7], layout, config);
  });
}