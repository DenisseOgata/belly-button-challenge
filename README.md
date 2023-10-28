
Belly Button Diversity Challenge
Aim of this challenge was to use the JavaScript visualizations knowledge, to create an interactive dashboard, to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize the human naval.

Intriguingly, a handful of microbial species called operational taxonomical units (OTUs) were present in more than 70% of the people and the rest were relatively rare. We aim to give users the autonomy to explore this for themselves with the interactive dashboard.

Used the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

Used sample_values as the values for the bar chart.

Used otu_ids as the labels for the bar chart.

Used otu_labels as the hovertext for the chart.

![image](https://github.com/DenisseOgata/belly-button-challenge/assets/123335767/94cd7982-c2d5-4288-97d4-f57b1f77b459)



Created a bubble chart that displays each sample.

Used otu_ids for the x values.

Used sample_values for the y values.

Used sample_values for the marker size.

Used otu_ids for the marker colors.

Used otu_labels for the text values.

![image](https://github.com/DenisseOgata/belly-button-challenge/assets/123335767/40b2bf78-95fb-4a06-81ad-c218bdbb7b15)


Displayed the sample metadata, i.e., an individual's demographic information.

Displayed each key-value pair from the metadata JSON object somewhere on the page.



![image](https://github.com/DenisseOgata/belly-button-challenge/assets/123335767/014c4c2f-6103-4572-8e46-c9d7ed0f5934)

Adapted the Gauge Chart from https://plot.ly/javascript/gauge-charts/Links to an external site. to plot the weekly washing frequency of the individual.

Updated the chart whenever a new sample is selected.

![image](https://github.com/DenisseOgata/belly-button-challenge/assets/123335767/054eafdb-d794-40d9-8aa6-b8c870dca68c)




##Tools Used
Javascript
HTML
d3
Plotly

References
https://observablehq.com/@arronhunt/building-a-gauge-meter-with-plotly

https://plotly.com/javascript/indicator/#overview

https://plotly.com/javascript/horizontal-bar-charts/
