import plotly.plotly as py
import plotly.graph_objs as go
import plotly
import json
import codecs
import numpy as np

rawData =json.load(codecs.open('NBA_stats.json', 'r', 'utf-8-sig'))

for i in range(50):
    rawData[i]['MissFT'] = round(rawData[i]['FTA']-rawData[i]['FTM'],1)
    rawData[i]['MissFG'] = round(rawData[i]['FGA']-rawData[i]['FGM'],1)

MissFT=[]
MissFG=[]
TOV=[]

for i in range(50):
 	MissFT.append(rawData[i]['MissFT'])
 	MissFG.append(rawData[i]['MissFG'])
 	TOV.append(rawData[i]['TOV'])
     
trace1 = go.Scatter3d(
    x=MissFT,
    y=MissFG,
    z=TOV,
    text = ['<br>MissedFT: '+'{}'.format(rawData[k]['MissFT'])+'<br>MissedFG: '+'{}'.format(rawData[k]['MissFG'])+'<br>TOV: '+'{}'.format(rawData[k]['TOV'])+'<br>PLAYER: '+'{}'.format(rawData[k]['PLAYER']) 
    	for k in range(50)],
    hoverinfo ='text',
    mode='markers',
    marker=dict(
        size=8,
        color=TOV,                # set color to an array/list of desired values
        colorscale='Viridis',   # choose a colorscale
        opacity=0.8
    ),
    showlegend = True,

)

data = [trace1]
layout = go.Layout(
	title ='NBA TOP50 AllStar Player Most Embarrassing Records',
 	scene = dict(
		xaxis = dict(
			title= 'Missed Free Throws',
			backgroundcolor="rgb(200, 200,200)",
            gridcolor="rgb(255, 255, 255)",
            showbackground=True,
            zerolinecolor="rgb(255, 255, 255)",),
		yaxis = dict(
			title= 'Missed Field Goals',
			backgroundcolor="rgb(220, 220,200)",
            gridcolor="rgb(255, 255, 255)",
            showbackground=True,
            zerolinecolor="rgb(255, 255, 255)",),

		zaxis = dict(
			title= 'Turnovers',
			backgroundcolor="rgb(200, 210,210)",
            gridcolor="rgb(255, 255, 255)",
            showbackground=True,
            zerolinecolor="rgb(255, 255, 255)",),),
)



fig = go.Figure(data=data, layout=layout)
#py.iplot(fig, filename='3d-scatter-colorscale')
#plotly.offline.plot(fig)
plotly.offline.plot(fig, filename='NBA.html')