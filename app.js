const file = "samples.json";

d3.json(file, function(data) {

var id = data.names;

d3.select("#selDataset").selectAll("option")
  .data(id)
  .enter()
  .append("option")
  .text(function(d){
    return d;
  });
});

function optionChanged (value){
  barChart(value);
  metaData(value)
}

function barChart(value){

d3.json(file, function(data) {


  var filterArray = data.samples.filter(x => x.id=== value);

  var sample_values = filterArray[0].sample_values

  var otu_array = filterArray[0].otu_ids

  var label = filterArray[0].otu_labels

  var otu_ids = otu_array.map(x => "OTU " + x);

  var ordered_otus = otu_ids.slice(0,10).reverse();

  var ordered_values = sample_values.slice(0,10).reverse();

  var ordered_labels = label.slice(0,10).reverse();


  var trace1 = {

    x: ordered_values,
    y: ordered_otus,
    type: "bar",
    orientation: "h",
    hovertext: ordered_labels
  };

  var data = [trace1]

  var layout = {
    title: "Top 10 OTU's Found"

  };


  Plotly.newPlot("bar", data, layout);

  var trace2 = {
            x: otu_array,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_array
            },
            //text:  data.samples[0].otu_labels

        };


        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        var data1 = [trace2];

    Plotly.newPlot("bubble", data1, layout_2);
});
};

function metaData(value){
  d3.json(file, function(data) {

    var filterArray = data.metadata.filter(x => x.id=== parseInt(value));
    var metaOtu = filterArray[0];


    demographicInfo = d3.select("#sample-metadata");
    demographicInfo.html("");


    Object.entries(metaOtu).forEach(([key,value]) => {
          demographicInfo.append("p").text(key.toUpperCase() + ": " + value + "\n");
      });
    console.log(metaOtu);
      });
  }
