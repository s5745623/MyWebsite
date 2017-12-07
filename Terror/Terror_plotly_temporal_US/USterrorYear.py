
import numpy as np
import pandas as pd
import plotly.plotly as py
import plotly.graph_objs as go
import plotly
from plotly import tools
from plotly.offline import iplot, init_notebook_mode

df = pd.read_csv('global_terrorism.csv', encoding ='utf-8',low_memory=False)

# terror_data = terror_data.rename(
#     columns={'eventid':'id', 'iyear':'year', 'imonth':'month', 'iday':'day',
#              'country_txt':'country', 'provstate':'state', 'targtype1_txt':'target',
#              'weaptype1_txt':'weapon', 'nkill':'fatalities', 'nwound':'injuries'})

df['nkill'] = df['nkill'].fillna(0).astype(int)
df['nwound'] = df['nwound'].fillna(0).astype(int)

# # terrorist attacks in United States only (2,198 rows)
# terror_usa = terror_data[(terror_data.country_txt == 'United States')]
# terror_usa= terror_usa.reset_index()
# #terror_usa = terror_data[(terror_data.longitude < 0)]                 
# terror_usa['iday'][terror_usa.iday == 0] = 1
# terror_usa = terror_usa.sort_values(['nkill', 'nwound'], ascending = False)
# terror_usa = terror_usa.drop_duplicates([ 'latitude', 'longitude', 'nkill'])# terrorist attacks by year
# terror_peryear = np.asarray(terror_usa.groupby('iyear').iyear.count())

# terror_years = np.arange(1970, 2016)
# terror_years = np.delete(terror_years, [23])

df['nkill'] = df['nkill'].fillna(0)
df = df.loc[df['country_txt'] == 'United States']
uni_year =  list(df['iyear'].unique())
terror_peryear = np.asarray(df.groupby('iyear').iyear.count())


trace = [go.Scatter(
         x = uni_year,
         y = terror_peryear,
         mode = 'lines',
         line = dict(
             color = 'rgb(240, 140, 45)',
             width = 3)
         )]

layout = go.Layout(
         title = 'Terrorist Attacks by Year in United States (1970-2015)',
         xaxis = dict(
             rangeslider = dict(thickness = 0.05),
             showline = True,
             showgrid = False
         ),
         yaxis = dict(
             #range = [0.1, 425],
             showline = True,
             showgrid = False)
         )

fig = dict(data = trace, layout = layout)
plotly.offline.plot(fig, filename='US_terrorism_temporal_US.html')