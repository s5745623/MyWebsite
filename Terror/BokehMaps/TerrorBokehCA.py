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
df = df.loc[df['provstate'] == 'California']



map_options = GMapOptions(lat=36.7783, lng=-119.4179, map_type="roadmap", zoom=6)

plot = GMapPlot(
    x_range=DataRange1d(), y_range=DataRange1d(), map_options=map_options, api_key=API_KEY
)
plot.title.text = "California Terror Attack Location"

source = ColumnDataSource(
    data=df
)


circle = Circle(y="latitude", x="longitude", size=10, fill_color="red", fill_alpha=0.8, line_color=None)
#print(circle)
plot.add_glyph(source, circle)

plot.add_tools(PanTool(), WheelZoomTool(), BoxSelectTool(), HoverTool(tooltips=[("Attacktype","@attacktype1_txt"),("Targettype","@targtype1_txt"),("GroupName","@gname"),("Death Count","@nkill"), ("latitude,longitude", "(@latitude, @longitude)")]))
output_file("gmap_CA.html")
show(plot)
