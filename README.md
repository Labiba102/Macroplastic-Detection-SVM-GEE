##Detection of Macro-plastic Accumulation in River Systems##
A Multi-Spectral Machine Learning Approach using Google Earth Engine (GEE)

Overview
This repository contains a scalable remote sensing pipeline developed to quantify the surge in riverine plastic pollution following China's 2018 "National Sword" Policy. By leveraging Sentinel-2 multi-spectral data and Support Vector Machines (SVM), this project monitors transboundary hotspots in Turkey, Thailand, and Vietnam to assess the environmental impact of redirected global waste flows.

Technical Methodology
The pipeline is divided into three core stages to ensure high-precision detection in narrow, fragmented urban river channels:

Water Body Extraction (SVM): Utilizes a Support Vector Machine with a Radial Basis Function (RBF) Kernel to delineate water boundaries. This approach outperforms traditional NDWI by successfully separating urban shadows and wet soil from water pixels.

Terrestrial Noise Filtering: Integrates the Google Open Buildings V3 dataset to mask out rooftops and roads, significantly reducing false positives in densely populated areas.

Pollution Quantification (WPIS): Introduces the Weighted Plastic Index Score (WPIS), a normalized metric that accounts for plastic intensity and water body area, allowing for standardized temporal comparisons (2017 vs. 2023).

Repository Structure
scripts/01_SVM_Water_Extraction.js: Training logic and morphological smoothing for water channel detection.

scripts/02_Building_Mask_Integration.js: Data fusion logic using building footprints for ROI refinement.

scripts/03_Plastic_Analysis_WPIS.js: Spectral index calculation (PI) and statistical evaluation of pollution intensity.

Validation
Validation was conducted using a Proxy Framework due to the lack of historical ground-truth data. Detections were cross-referenced with:

High-resolution (3m) visual imagery from Google Earth Pro and PlanetScope.

Spatiotemporal records of confirmed plastic accumulation from Garaba and Park (2024).

How to Run
Open the Google Earth Engine Code Editor.

Load the scripts from the /scripts folder.

Set your desired ROI and adjust the Dynamic Threshold Sliders to visualize plastic accumulation hotspots.

Academic Context
This research was developed as part of a study on the intersection of global trade policy and localized environmental degradation. It demonstrates proficiency in Machine Learning, Spatial Statistics, and Big Data processing for environmental monitoring.
