import pandas as pd
import numpy as np
import plotly
import plotly.plotly as py
import plotly.graph_objs as go



df = pd.read_csv('global_terrorism.csv', encoding ='utf-8',low_memory=False)


df_NY = df.ix[df['provstate'] == 'New York'].reset_index(drop=True)
df_CA = df.ix[df['provstate'] == 'California'].reset_index(drop=True)
df_PR = df.ix[df['provstate'] == 'Puerto Rico'].reset_index(drop=True)



df_total = pd.concat([df_NY, df_CA, df_PR])


year_list = list(df_total['iyear'].unique())
year_list = sorted(year_list)

# calculating nkill by the years
list_NY = []
for i in range(len(year_list)):
    sub_df = df_NY.ix[df_NY['iyear']==year_list[i]].reset_index(drop=True)
    kill_temp = len(sub_df['attacktype1_txt'])
    list_NY.append(kill_temp)

list_CA = []
for i in range(len(year_list)):
    sub_df = df_CA.ix[df_CA['iyear']==year_list[i]].reset_index(drop=True)
    kill_temp = len(sub_df['attacktype1_txt'])
    list_CA.append(kill_temp)

list_PR = []
for i in range(len(year_list)):
    sub_df = df_PR.ix[df_NY['iyear']==year_list[i]].reset_index(drop=True)
    kill_temp = len(sub_df['attacktype1_txt'])
    list_PR.append(kill_temp)

# plotting 
trace1 = go.Scatter(
    x=year_list,
    y=list_NY,
    name='New York'
)
trace2 = go.Scatter(
    x=year_list,
    y=list_CA,
    name='California'
)
trace3 = go.Scatter(
    x=year_list,
    y=list_PR,
    name='Puerto Rico'
)

data = [trace1, trace2, trace3]
layout = go.Layout(
    title="Attack Count by year in New York, California and Puerto Rico"
)

fig = go.Figure(data=data, layout=layout)
plotly.offline.plot(fig, filename='Top3states_attackcount.html')