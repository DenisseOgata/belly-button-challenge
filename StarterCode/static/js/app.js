let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Initialize dashboard
function init() {
    // Fetch JSON and display it
d3.json(url).then(function (data) {
    console.log(data);

    // Use d3 to select and assign a variable for to the dropdown menu
    let dropDownMenu = d3.select("#selDataset");

    // Set a variable for sample names 
    let names = data.names;

     // Loop through the names dictionary and assign the values to dropdown
     for (i = 0; i < names.length; i++) {
        dropDownMenu
            .append("option")
            .text(names[i])
            .property("value", names[i])
    }

    // Call the element funtions in the webpage
    graphs(names[0]);
    demographic_info(names[0]);
    createGauge(names[0]);
})
};

// Create a function to assign the first demographic info of patient 0 to the dashboard
function demographic_info(patient_id) {

    // Fetch the json object 
    d3.json(url).then(function (data) {

        // Initialize an array to change a new patient when id is selected
        let resultArray = data.metadata.filter(sampleObj => sampleObj.id == patient_id);

        // Initialize the metadata to be displayed to a variable 
        let info = resultArray[0];

        // Use D3 to select the div tag for sample metadata
        let sample = d3.select("#sample-metadata");
        sample.html("")

        // Append the first row of metadata as a sample demographic info 
        for (let i in info) {
            sample
                .append("table")
                .text(`${i}: ${info[i]}`)
                .property('value', i)

        }

    });
};

// Create a function to create graphs
function graphs(patient_id) {

    // Fetch the json object 
    d3.json(url).then(function (data) {

        // Initialize an array to select different patient Id
        let resultArray = data.samples.filter(sampleObj => sampleObj.id == patient_id);

        // Initialize the metadata to be displayed to a variable 
        let info = resultArray[0];

        // Set new variables for the bar chart
        let otu_ids = info.otu_ids;
        let otu_labels = info.otu_labels;
        let sample_values = info.sample_values;

        // Create a bar chart data for top 10 OTUs.
        let barData = [
            {
                y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        // Create the layout for the horizontal bar chart 
        let barLayout = {
            title: "Top 10 Types of Bacteria Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);

        // Create the bubble graph for individual patient ids
        let bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ];

        // Create a bubble chart layout
        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
};



// Create a function for optionChanged 
function optionChanged(id) {
    demographic_info(id);
    graphs(id);
    createGauge(id);
};
init();

// Create a function to generate a gauge chart with a needle to display wash frequency
function createGauge(sample) {
    // Enter the washing frequency between 0 and 180
    d3.json(url).then(data => {
      
      // Initialize variables with metadata and convert the wfreq into degrees
      let info = data.metadata;
      let metaData = info.filter(result => result.id == sample);
      let level = parseFloat(metaData[0].wfreq) * 20;
      console.log(level);
  
      // Trig to calc meter point
      let degrees = 180 - level;
      let radius = 0.5;
      let radians = (degrees * Math.PI) / 180;
      let x = radius * Math.cos(radians);
      let y = radius * Math.sin(radians);
  
      // Create the path for the needle to move across
      let mainPath = (degrees < 45 || degrees > 135) ? "M -0.0 -0.025 L 0.0 0.025 L " : "M -0.025 -0.0 L 0.025 0.0 L ";
      let pathX = String(x);
      let space = " ";
      let pathY = String(y);
      let pathEnd = " Z";
      let path = mainPath.concat(pathX, space, pathY, pathEnd);
      
      // Create the data for the guage chart 
      let guageData = [
        {
          type: "scatter",
          x: [0],
          y: [0],
          marker: { size: 12, color: "850000" },
          showlegend: false,
          name: "Freq",
          text: level,
          hoverinfo: "text+name"
        },
        {
          values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
          rotation: 90,
          text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
          textinfo: "text",
          textposition: "inside",
          marker: {
            colors: [
              "rgba(0, 105, 11, .5)",
              "rgba(10, 120, 22, .5)",
              "rgba(14, 127, 0, .5)",
              "rgba(110, 154, 22, .5)",
              "rgba(170, 202, 42, .5)",
              "rgba(202, 209, 95, .5)",
              "rgba(210, 206, 145, .5)",
              "rgba(232, 226, 202, .5)",
              "rgba(240, 230, 215, .5)",
              "rgba(255, 255, 255, 0)"
            ]
          },
          labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
          hoverinfo: "label",
          hole: 0.5,
          type: "pie",
          showlegend: false
        }
      ];
  
      // Create the layout for the gauge chart 
      let layout = {
        shapes: [
          {
            type: "path",
            path: path,
            fillcolor: "850000",
            line: {
              color: "850000"
            }
          }
        ],
        title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
        height: 500,
        width: 500,
        xaxis: {
          zeroline: false,
          showticklabels: false,
          showgrid: false,
          range: [-1, 1]
        },
        yaxis: {
          zeroline: false,
          showticklabels: false,
          showgrid: false,
          range: [-1, 1]
        }
      };
  
      let config = {responsive: true};
      let GAUGE = document.getElementById("gauge");
      Plotly.newPlot(GAUGE, guageData, layout, config);
    });
  };
  





