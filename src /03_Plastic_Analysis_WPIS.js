/**
 * PART 3: Spectral Analysis & Metric Development
 * Focus: Calculating PI and the Weighted Plastic Index Score (WPIS).
 */

// 1. Calculate Indices
var ndvi = s3.normalizedDifference(['B4','B8']);
var mndwi = s3.normalizedDifference(['B8','B11']);

// 2. Custom Plastic Index (PI) Formula
// Removing vegetation and water noise for high-precision debris detection
var pi = s3.select('B8').divide(s3.select('B8').add(s3.select('B4')));
var piClean = pi.subtract(ndvi.updateMask(ndvi.gt(0.001)))
                .subtract(mndwi.updateMask(mndbi.gt(0.001)));

var plasticInNonHouse = piClean.updateMask(nonHouseMask);

// 3. WPIS Logic (Weighted Plastic Index Score)
var weightedPlastic = plasticInNonHouse.multiply(plasticInNonHouse);
var weightedPlasticSum = weightedPlastic.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: roi,
  scale: 100
});

// 4. Quantification & Evaluation
weightedPlasticSum.evaluate(function(result) {
  var WPIS = result[Object.keys(result)[0]] / plasticCount;
  print("Weighted Plastic Index Score (WPIS):", WPIS);
});

// UI: Dynamic Thresholding Sliders
var minSlider = ui.Slider({min: -1, max: 1, step: 0.01, value: 0.01, onChange: updateVisualization});
Map.add(ui.Panel([ui.Label('Plastic Intensity Threshold'), minSlider]));
