import pandas as pd
import numpy as np
import plotly
import plotly.plotly as py
import plotly.graph_objs as go



df = pd.read_csv('global_terrorism.csv', encoding ='utf-8',low_memory=False)


df_NY = df.ix[df['provstate'] == 'New York'].reset_index(drop=True)
df_CA = df.ix[df['provstate'] == 'California'].reset_index(drop=True)
df_PR = df.ix[df['provstate'] == 'Puerto Rico'].reset_index(drop=True)

df_NY['nkill'] = df_NY['nkill'].fillna(0)
df_CA['nkill'] = df_CA['nkill'].fillna(0)
df_PR['nkill'] = df_PR['nkill'].fillna(0)

df_total = pd.concat([df_NY, df_CA, df_PR])


attack_list = list(df_total['attacktype1_txt'].unique())
attack_list = sorted(attack_list)

# calculating nkill by the years
list_NY = []
for i in range(len(attack_list)):
    sub_df = df_NY.ix[df_NY['attacktype1_txt']==attack_list[i]].reset_index(drop=True)
    kill_temp = 0
    for j in range(len(sub_df)):
        temp = sub_df['nkill'][j]
        kill_temp = kill_temp + temp
    list_NY.append(kill_temp)

list_CA = []
for i in range(len(attack_list)):
    sub_df = df_CA.ix[df_CA['attacktype1_txt']==attack_list[i]].reset_index(drop=True)
    kill_temp = 0
    for j in range(len(sub_df)):
        temp = sub_df['nkill'][j]
        kill_temp = kill_temp + temp
    list_CA.append(kill_temp)

list_PR = []
for i in range(len(attack_list)):
    sub_df = df_PR.ix[df_NY['attacktype1_txt']==attack_list[i]].reset_index(drop=True)
    kill_temp = 0
    for j in range(len(sub_df)):
        temp = sub_df['nkill'][j]
        kill_temp = kill_temp + temp
    list_PR.append(kill_temp)

# plotting 
trace1 = go.Bar(
    x=attack_list,
    y=list_NY,
    name='New York'
)
trace2 = go.Bar(
    x=attack_list,
    y=list_CA,
    name='California'
)
trace3 = go.Bar(
    x=attack_list,
    y=list_PR,
    name='Puerto Rico'
)

data = [trace1, trace2, trace3]
layout = go.Layout(
    barmode='stack',
    title="Death Count by attack type in New York, California and Puerto Rico"
)

fig = go.Figure(data=data, layout=layout)
plotly.offline.plot(fig, filename='Top3states_deathcount.html')