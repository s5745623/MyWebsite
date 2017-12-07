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

df = open('global_terrorism.csv','r')
df = pd.read_csv(df, sep=',', encoding='latin1',low_memory=False)
df['nkill'] = df['nkill'].fillna(0)
df = df.loc[df['provstate'] == 'New York']



map_options = GMapOptions(lat=40.7128, lng=-74.0060, map_type="roadmap", zoom=10)

plot = GMapPlot(
    x_range=DataRange1d(), y_range=DataRange1d(), map_options=map_options, api_key=API_KEY
)
plot.title.text = "New York Terror Attack Location"

source = ColumnDataSource(
    data=df
)


circle = Circle(y="latitude", x="longitude", size=10, fill_color="red", fill_alpha=0.8, line_color=None)
#print(circle)
plot.add_glyph(source, circle)

plot.add_tools(PanTool(), WheelZoomTool(), BoxSelectTool(), HoverTool(tooltips=[("Attacktype","@attacktype1_txt"),("Targettype","@targtype1_txt"),("GroupName","@gname"),("Death Count","@nkill"), ("latitude,longitude", "(@latitude, @longitude)")]))
output_file("gmap_NY.html")
show(plot)
