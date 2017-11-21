import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.cluster import DBSCAN
from sklearn import decomposition
from sklearn.preprocessing import StandardScaler
from scipy.cluster.hierarchy import dendrogram, linkage

from scipy.cluster.hierarchy import cophenet
from scipy.spatial.distance import pdist
import os
import glob

from bokeh.io import output_file, show
from bokeh.plotting import figure

from bokeh.models import (
  GMapPlot, GMapOptions, ColumnDataSource, Circle, DataRange1d, PanTool, WheelZoomTool, BoxSelectTool, HoverTool
)


########################################################################
for a in range(1,21):
	l = [pd.read_csv(filename) for filename in glob.glob('/Data/*.csv')]
	myData = pd.concat(l, axis=0)

	


	API_KEY="AIzaSyBZha7DKqyZDkEBIdsMh1ESZzxXnkZLcYw"
	Y=myData['pickup_latitude']   #assigning latitude to X
	X=myData['pickup_longitude']   #assigning longitude to Y


	  #dropping nan in Y
	myDataFrame = pd.concat([X, Y], axis=1)   #putting X and Y together
	myDataFrame = myDataFrame.dropna()
	myDataFrame = myDataFrame.as_matrix()

	k=a     # the number of cluster you want to see

	kmeans = KMeans(n_clusters=k)      #initializing kmeans with k clusters
	kmeans.fit(myDataFrame)         

	labels=kmeans.labels_           
	centroids=kmeans.cluster_centers_    #centroids
	lat =[]
	lon = []
	print('k='+str(a))
	for i in centroids:
	    print(str(i[1])+',\t'+str(i[0]))

	    lat.append(i[1])
	    lon.append(i[0])
	print('\n')
	mydict= dict(latitude = lat, longitude = lon)


	map_options = GMapOptions(lat=40.687611, lng=-73.893925, map_type="roadmap", zoom=10,)
	plot = GMapPlot(
	    x_range=DataRange1d(), y_range=DataRange1d(), map_options=map_options, api_key=API_KEY
	)
	plot.title.text = "Kmeans"

	source = ColumnDataSource(
	    data=mydict
	)


	circle = Circle(y="latitude", x="longitude", size=10, fill_color="blue", fill_alpha=0.8, line_color=None)
	plot.add_glyph(source, circle)

	plot.add_tools(PanTool(), WheelZoomTool(), BoxSelectTool(), HoverTool(tooltips=[ ("latitude,longitude", "(@latitude, @longitude)")]))
	    
	output_file("kmeans"+str(a)+".html")
	show(plot)
