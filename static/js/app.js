// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let filteredSamples = metadata.filter((sampleMeta)=>sampleMeta.id==sample);
    let filteredSample = filteredSamples[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    let Panel = d3.select("#sample-metadata");


    // Use `.html("") to clear any existing metadata
    Panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(filteredSample).forEach(([key, value])=>{
      Panel.append("h6").text(`${key}: ${value}`)
    })
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples  = data.samples;



    // Filter the samples for the object with the desired sample number
    let filteredSamples = samples.filter((sampleObj)=>sampleObj.id==sample);
    console.log('filter: ', filteredSamples)


    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = filteredSamples[0].otu_ids;
    let otu_labels = filteredSamples[0].otu_labels;
    let sample_values = filteredSamples[0].sample_values;

    console.log('1: ', otu_ids)
    console.log('1: ', otu_ids)
    console.log('1: ', otu_ids)


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately

     // For the Bar Chart, map the otu_ids to a list of strings for your yticks
     let barData=[{
      y: otu_ids.slice(0, 10).map(otuID=>`OTU ${otuID}`).reverse(),
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: 'h'
     }]

     // Render the Bar Chart
     let barLayout={
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "Number of Bacteria"}
     }

     Plotly.newPlot("bar", barData, barLayout)

    // Build a Bubble Chart
    let bubbleData=[{
      y: sample_values,
      x: otu_ids,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
      }
    }]

    let bubbleLayout={
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Number of Bactria"}

    }
    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)
   


   

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    console.log(data); // name list
    // Get the names field

    // Use d3 to select the dropdown with id of `#selDataset`
    let selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    data.names.forEach((sample)=>{ // how to iterate over an array using for loop
      selector.append("option").text(sample).property("value", sample);   // how we can access the html properties using js
    })

    // Get the first sample from the list
    let firstSample = data.names[0]

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample)
  buildCharts(newSample)
}

// Initialize the dashboard
init();
