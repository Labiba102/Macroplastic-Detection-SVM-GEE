/**
 * PART 2: Building Mask & ROI Refinement
 * Focus: Using the Google Open Buildings dataset to refine the detection area.
 */

var buildings = ee.FeatureCollection('GOOGLE/Research/open-buildings/v3/polygons')
                  .filterBounds(roi);

// Filter by confidence levels to create a terrestrial noise mask
var buildingsMask = buildings.filter('confidence >= 0.65').reduceToImage({
    properties: ['confidence'],
    reducer: ee.Reducer.anyNonZero()
});

var nonHouseMask = buildingsMask.not();

// Apply mask to refined water bodies
var definiteWaterBodies = waterBodies.updateMask(nonHouseMask);
Map.addLayer(definiteWaterBodies, {palette: ['blue']}, 'Definite Water Bodies (Non-Urban)');
