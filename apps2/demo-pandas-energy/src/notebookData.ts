import { CodeBlock } from "thebe-core/dist/notebook";

export const notebookData: CodeBlock[] = [
  {
    id: "pandas-imports-load-data",
    source: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import itertools
import warnings
warnings.filterwarnings('ignore')

df = pd.read_csv('https://public-demodata.s3.us-west-2.amazonaws.com/owid/owid-energy-data.csv');
df['fossil_consumption'] = df['fossil_fuel_consumption']
df['biofuel_energy_per_capita'] = df['biofuel_cons_per_capita']

stat_suffix = ['consumption', 'share_energy', 'electricity']
stat_unit = ['terawatt-hours','percentage','terawatt-hours']
fuel = ['biofuel','coal','gas','hydro','nuclear','oil', 'solar','wind']
    `,
  },
  {
    id: "pandas-params",
    source: `normalize = False # @param
selected_stat = stat_suffix[2] # @param
selected_unit = stat_unit[stat_suffix.index(selected_stat)]
selected_year = 2019 # @param
countries = "South Korea,United States Virgin Islands,Indonesia,Italy,Thailand,French Guiana,United Kingdom,Taiwan" # @param
country_list = countries.split(",")
  `,
  },
  {
    id: "pandas-stats",
    source: `stats = ["_".join(items) for items in itertools.product(fuel, [selected_stat])]
keep_cols = ['year', 'gdp','country']+stats
df2 = pd.concat([df[['country','year', 'gdp']], df.filter(items=stats)], axis=1)[df['year']> 1990]
df2.describe()[1:].style.format({'gdp': '\${0:,.0f}'})
`,
  },
  {
    id: "pandas-plot-gdp",
    source: `df_sel = df2[df2['country'].isin(country_list)]
with plt.style.context('seaborn-darkgrid'):
    fig, ax = plt.subplots(1,2, figsize=(20,8), gridspec_kw={'width_ratios': [2, 1]})
    df_gdp = df_sel[['country', 'year','gdp']]
    df_gdp['gdp'] = df_gdp['gdp'] / 1e9;
    df_gdp_c = df_gdp.groupby('country')

    df_gdp_c.plot(kind="line", x='year', ax=ax[0], legend=False);

    ax[1].set_title('Country GDP Since 1990 ($ Billion)')
    ax[0].set_xlabel('Year')
    ax[0].set_ylabel('GDP $ Billion')

    df_sel['gdp'] = df_sel['gdp'].ffill();
    df_sel[df_sel['year'] == selected_year][['country','gdp']].set_index('country').plot(kind="pie", y='gdp', ax=ax[1]).legend(loc='center left',bbox_to_anchor=(1.0, 1.0));
    ax[1].set_ylabel('')
    ax[1].set_title('Relative GDP per Country')
    plt.tight_layout()`,
  },
  {
    id: "pandas-plot-stats",
    source: `with plt.style.context('seaborn-darkgrid'):
    fig, ax = plt.subplots(1,2,figsize=(20,8), gridspec_kw={'width_ratios': [2, 1]})
    df_p = df_sel[(df_sel['year'] == selected_year)][['country']+stats]
    df_p = df_p.set_index('country')

    if normalize:
        df_p = 100*df_p.div(df_p.sum(axis=1), axis=0)

    s = df_p.sum(axis=1).sort_values(ascending=True)
    df_p = df_p.reindex(s.index)
    df_p.plot(kind="barh", ax=ax[0], stacked=True, width=0.95, legend=False);
    ax[0].set_title('Statistic: ' + selected_stat,fontsize=16);
    ax[0].set_ylabel('Country',fontsize=16);
    ax[0].set_xlabel("[percentage]" if normalize else f"[{selected_unit}]",fontsize=14);    
    for label in (ax[0].get_xticklabels() + ax[0].get_yticklabels()):
        label.set_fontsize(14)

    df_p.sum().plot(kind="pie", ax=ax[1])
    ax[1].set_ylabel('')
    ax[1].set_title('Fuel Type Distribution for these Countries', fontsize=16)    
    `,
  },
  {
    id: "pandas-table-stats",
    source: `df_p.columns = df_p.columns.str.replace("_", " ")
df_p.style.set_table_styles([dict(selector="th",props=[('max-width', '50px'), ('text-align','center')])])`,
  },
];
