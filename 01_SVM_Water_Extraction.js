/**
 * PART 1: Supervised Water Masking (SVM)
 * Focus: Detecting narrow and fragmented water channels using RBF Kernel.
 */

var selectedBands = ['B2', 'B3', 'B4', 'B8', 'B11'];
var lahore = ee.Geometry.Polygon([[[74.1659, 31.6132], [74.1659, 31.3767], [74.4893, 31.3767], [74.4893, 31.6132]]]);

// Load training image (Median composite)
var s2 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2023-01-01', '2023-05-31')
    .filterBounds(lahore)
    .select(selectedBands)
    .median()
    .clip(lahore);

// Training Logic 
var trainingPoints = ee.FeatureCollection([
    // Water training polygons (Narrow straight running water bodies)
  ee.Feature(ee.Geometry.Polygon(
        [[[74.32898858150506, 31.538076961203345],
          [74.33266857227349, 31.537475734095217],
          [74.33270344099068, 31.537558031570683],
          [74.32901272138619, 31.538156972123545]]]), {class: 0}),
  ee.Feature(ee.Geometry.Polygon(
        [[[74.31943796173343, 31.539830342530003],
          [74.3220987130762, 31.53914454471029],
          [74.32216308609256, 31.539231412712752],
          [74.31944332615146, 31.539949213639765]]]), {class: 0}),
  ee.Feature(ee.Geometry.Polygon(
        [[[74.3694158782876, 31.61057279368395],
          [74.37504315280084, 31.610522540164308],
          [74.3750002374566, 31.61067330064184],
          [74.36940514945154, 31.610709848599647]]]), {class: 0}),  
  ee.Feature(ee.Geometry.Polygon(
        [[[74.28572517332047, 31.543517541393037],
          [74.28580563959092, 31.543442106859253],
          [74.2870260446927, 31.54437017597561],
          [74.28692143854111, 31.544441038016608]]]), {class: 0}),
  ee.Feature(ee.Geometry.Polygon(
        [[[74.29599265477536, 31.546247685576773],
          [74.29608384988187, 31.546343690268777],
          [74.29404537103055, 31.547770034059397],
          [74.2939112605798, 31.54768774558712]]]), {class: 0}),


  // Vegetation training point
  ee.Feature(ee.Geometry.Polygon(
        [[[74.32318808183811, 31.482782279608855],
          [74.32657839403294, 31.481391542125728],
          [74.32962538347385, 31.486039452280256],
          [74.32421805009983, 31.487247139170517]]]), {class: 1}), 
  ee.Feature(ee.Geometry.Polygon(
        [[[74.33919550523899, 31.482123511798957],
          [74.34026838884495, 31.482526092678402],
          [74.33632017717503, 31.492041136361657],
          [74.33507563219212, 31.491931352915493]]]), {class: 1}), 
  ee.Feature(ee.Geometry.Polygon(
        [[[74.32960778401001, 31.510298284795574],
          [74.33143168614014, 31.511962992813217],
          [74.3307235829602, 31.51309717250067],
          [74.32896405384643, 31.51326181034347]]]), {class: 1}), 
  ee.Feature(ee.Geometry.Polygon(
        [[[74.34062282484263, 31.505462907263116],
          [74.34314410131662, 31.504749414983404],
          [74.3446354095289, 31.508216204618737],
          [74.34296171110361, 31.5087924658946]]]), {class: 1}), 
  ee.Feature(ee.Geometry.Polygon(
        [[[74.33208316359956, 31.503889328249613],
          [74.33249890599687, 31.50399909765706],
          [74.3323969820543, 31.5042460783525],
          [74.33200537953813, 31.504081424628023]]]), {class: 1}), 
  ee.Feature(ee.Geometry.Polygon(
        [[[74.32631486321154, 31.593526102858036],
          [74.32768278980913, 31.593521533521024],
          [74.3274252977437, 31.595308127202635],
          [74.32545119190874, 31.59520760365971]]]), {class: 1}),   
  // Built-up training point
  ee.Feature(ee.Geometry.Polygon(
        [[[74.33194368873079, 31.50345710995496],
          [74.33205634150941, 31.503466257452814],
          [74.33168351445634, 31.504401584381526],
          [74.3315681794687, 31.504376429012016]]]), {class: 2}), 
  ee.Feature(ee.Geometry.Polygon(
        [[[74.33231115136583, 31.50345710995496],
          [74.3335852006479, 31.503715526424276],
          [74.33323651347597, 31.504083711487297],
          [74.33210193906267, 31.503868746471376]]]), {class: 2}), 
  ee.Feature(ee.Geometry.Polygon(
        [[[74.32907640729387, 31.502370838223033],
          [74.33145284448106, 31.503020315891575],
          [74.33088958058794, 31.503889328249613],
          [74.3284326771303, 31.50300202080776]]]), {class: 2}), 
  ee.Feature(ee.Geometry.Polygon(
        [[[74.33010235224206, 31.502597241162036],
          [74.33110952172716, 31.50287166823182],
          [74.33107197080095, 31.502915119110654],
          [74.33011710439165, 31.50265212664043]]]), {class: 2}), 
  ee.Feature(ee.Geometry.Polygon(
        [[[74.2536050741784, 31.519021496694602],
          [74.25570792604607, 31.516570343247626],
          [74.259656137716, 31.52513080821625],
          [74.25738162447136, 31.525935597913804]]]), {class: 2}), 

  // Bare soil training point
  ee.Feature(ee.Geometry.Point([74.33255542349802, 31.566793267882765]), {class: 3}), 
  ee.Feature(ee.Geometry.Point([74.33255542349802, 31.566793267882765]), {class: 3}), 
  ee.Feature(ee.Geometry.Point([74.33255542349802, 31.566793267882765]), {class: 3}), 
  ee.Feature(ee.Geometry.Point([74.33255542349802, 31.566793267882765]), {class: 3}), 
  ee.Feature(ee.Geometry.Point([74.33255542349802, 31.566793267882765]), {class: 3}), 

]);

var training = s2.sampleRegions({
  collection: trainingPoints,
  properties: ['class'],
  scale: 10
});

// Initialize SVM Classifier with Radial Basis Function (RBF)
var svmClassifier = ee.Classifier.libsvm({
  kernelType: 'RBF',
  cost: 10
}).train({
  features: training.randomColumn().filter(ee.Filter.lte('random', 0.7)),
  classProperty: 'class',
  inputProperties: ['B2', 'B3', 'B4', 'B8']
});

// Post-Processing: Morphological operations for connectivity
var classified = s2.classify(svmClassifier);
var morphed = classified.convolve(ee.Kernel.gaussian(5, 1.5, 'pixels'))
  .focal_max({radius: 1, units: 'pixels'})
  .focal_min({radius: 1, units: 'pixels'});

// Extract Water Mask
var waterMask = morphed.eq(0);
var waterBodies = morphed.updateMask(waterMask).rename('water_body');

Map.addLayer(waterBodies, {palette: ['blue']}, 'Refined Water Mask');
