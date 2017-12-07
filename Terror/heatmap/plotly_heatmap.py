import datetime
import numpy as np
import plotly.plotly as py
import plotly
import plotly.graph_objs as go
import pandas as pd


df = pd.read_csv('Terror_US.csv')

df = df[['targtype1_txt','provstate','nkill']]
df = df.groupby(['provstate','targtype1_txt']).sum()
df = df.reset_index()

states=[]
for i in range(len(df)):
    states.append(df['provstate'][i])

nkill=[]
for j in range(len(df)):
    nkill.append(df['nkill'][j])

target = []
for k in range(len(df)):
    target.append(df['targtype1_txt'][k])




data = [
    go.Heatmap(
        z=nkill,
        x=states,
        y=target,
        colorscale='Viridis',
    )
]

layout = go.Layout(
    title='US Terror',
    #xaxis = dict(ticks='', nticks=50),
    yaxis = dict(ticks='' )
)

fig = go.Figure(data=data, layout=layout)

#py.iplot(fig, filename='datetime-heatmap')
plotly.offline.plot(fig, filename='US_terror.html')
