import plotly.plotly as py
import pandas as pd
import plotly.tools as tls
import plotly.graph_objs as go
import plotly
import codecs

#fields = ['iyear','longitude', 'latitude','nkill','attacktype1_txt','country_txt','provstate','targtype1_txt','gname']

df = pd.read_csv('global_terrorism.csv', encoding ='utf-8',low_memory=False)
#year = [2011,2012,2013,2014,2015,2016]
#df = df[df.iyear.isin(year)]
#df =df[0:100]
#df = df.loc[df['nkill'] != 0]
df['nkill'] = df['nkill'].fillna(0)
df = df.loc[df['country_txt'] == 'United States']
uni_year =  list(df['iyear'].unique())
#uni_year = uni[len(uni)-11:len(uni)]
print(len(uni_year))
cities = []
#colors = ['rgb(33,113,181)','rgb(107,174,214)','rgb(189,215,231)','rgb(239,243,255)','transparent']
df['text'] ='Country: '+ df['country_txt'].astype(str)+ '<br>States: '+ df['provstate'].astype(str) + '<br>Type of attack: '+ df['attacktype1_txt'].astype(str) + '<br>Target of attack: '+ df['targtype1_txt'].astype(str)+ '<br>Group name: '+ df['gname'].astype(str)+'<br>Number of death: ' + df['nkill'].astype(str)

#['rgb(33,113,181)','rgb(107,174,214)','rgb(189,215,231)','rgb(239,243,255)','transparent']
for i in range(len(uni_year)):

    #set data for the year
    sub_df = df.ix[df['iyear'] == uni_year[i]].reset_index(drop=True)
    city = dict(
        type = 'scattergeo',
        lon = sub_df['longitude'],
        lat = sub_df['latitude'],
        text = sub_df['text'],
        marker = dict(
            size = (sub_df['nkill']+1)*35,
            color = 'rgb(255,97,97)',
            sizemode = 'area'
        ),
  
        )
    cities.append(city)

steps = []
for i in range(len(uni_year)):
    step = dict(
        method = 'restyle',
        args = ['visible', [False] * len(uni_year)],
        label = 'Year: {}'.format(uni_year[i])
    )
    step['args'][1][i] = True # Toggle i'th trace to "visible"
    steps.append(step)

sliders = [dict(
    active = 0,
    pad = {"t": 1},
    steps = steps
)]

layout = dict(
        title = '<br>US Terrorism',
        showlegend = False,
        geo = dict(
            scope='usa',
            projection=dict( type='albers usa' ),
            showland = True,
            landcolor = 'rgb(217, 217, 217)',
            subunitwidth=1,
            countrywidth=1,
            subunitcolor="rgb(255, 255, 255)",
            countrycolor="rgb(255, 255, 255)"
        ),
        sliders=sliders
    )



fig = go.Figure( data=cities, layout=layout )
#py.plot( fig, validate=False, filename='Trror' )
##This creates a direct link to the vis
#tls.get_embed('https://plot.ly/~s5745623/503')
#plotly.offline.plot(fig)
plotly.offline.plot(fig, filename='global_terrorism_US.html')
