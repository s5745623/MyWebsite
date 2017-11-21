#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""

@author: yuanyaozhang
"""

import pandas as pd
import numpy as np
from pprint import pprint
from bokeh.io import output_file, show
from bokeh.plotting import figure

from bokeh.models import (
  GMapPlot, GMapOptions, ColumnDataSource, Circle, DataRange1d, PanTool, WheelZoomTool, BoxSelectTool, HoverTool
)

API_KEY="AIzaSyBZha7DKqyZDkEBIdsMh1ESZzxXnkZLcYw"

dataMontgomeryCrime = open('dataMontgomeryCrimeGeo.csv','r')
dataMontgomeryCrime = pd.read_csv(dataMontgomeryCrime, sep=',', encoding='latin1')



map_options = GMapOptions(lat=39.1, lng=-77.24, map_type="roadmap", zoom=10)

plot = GMapPlot(
    x_range=DataRange1d(), y_range=DataRange1d(), map_options=map_options, api_key=API_KEY
)
plot.title.text = "MontgomeryCrimeGeo"

source = ColumnDataSource(
    data=dataMontgomeryCrime
)


circle = Circle(y="latitude", x="longitude", size=2, fill_color="blue", fill_alpha=0.8, line_color=None)
plot.add_glyph(source, circle)

plot.add_tools(PanTool(), WheelZoomTool(), BoxSelectTool(), HoverTool(tooltips=[("District","@district"), ("latitude,longitude", "(@latitude, @longitude)"),
                       ("Date","@start_date"),("Crime Type", "@narrative"),("Day of week","@day_of_week")]))
output_file("gmap_mont.html")
show(plot)
