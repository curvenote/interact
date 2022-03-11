import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notebook from "thebe-core/dist/notebook";
import {
  RVar,
  RScope,
  RDynamic,
  RCheckbox,
  RSelect,
} from "common/dist/react/components";
import {
  MakePageLive,
  Output,
  selectors,
  connect,
  fetchNotebook,
} from "common";
import { notebookData } from "./notebookData";
import { AppDispatch } from "./store";

const COUNTRIES = [
  "Iraq",
  "Western Sahara",
  "Vietnam",
  "Colombia",
  "South Africa",
  "United Arab Emirates",
  "Maldives",
  "Malaysia",
  "Philippines",
  "Argentina",
  "Netherlands Antilles",
  "New Caledonia",
  "Netherlands",
  "Thailand",
  "Taiwan",
  "Niue",
  "Nigeria",
  "Poland",
  "Pakistan",
  "Australia",
  "Egypt",
  "Iran",
  "Spain",
  "Saudi Arabia",
  "Turkey",
  "South Sudan",
  "South Korea",
  "Mexico",
  "Italy",
  "United Kingdom",
  "French Guiana",
  "French Polynesia",
  "France",
  "Indonesia",
  "British Virgin Islands",
  "Brazil",
  "Brunei",
  "Russia",
  "Germany",
  "Japan",
  "India",
  "China",
  "Canada",
  "United States",
  "Middle East",
  "Middle Africa",
  "South America",
  "North America",
  "Western Africa",
  "World",
];

function MyArticle() {
  const dispatch = useDispatch<AppDispatch>();
  const notebookId = useSelector(selectors.getActiveNotebookId);

  useEffect(() => {
    dispatch(fetchNotebook(notebookData)).then((nb: Notebook) => {
      dispatch(connect.actions.setActiveNotebookId(nb.id));
    });
  }, []);

  const initialCountryList: string[] = [];
  if (COUNTRIES.length < 10) throw Error("Need more countries to chose from");
  while (initialCountryList.length < 7) {
    const c = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    if (initialCountryList.indexOf(c) === -1) {
      console.log(c);
      initialCountryList.push(c);
    }
  }

  return (
    <RScope name="page">
      <div style={{ position: "fixed", top: 0, left: 0, visibility: "hidden" }}>
        <RVar name="countries" value={initialCountryList} type="Array"></RVar>
        <RVar name="selected_stat" value="consumption" type="String"></RVar>
        <RVar name="selected_year" value={2019} format=".0f"></RVar>
        <RVar name="normalize" value={false} type="Boolean"></RVar>
      </div>
      <article className="centered wide">
        <MakePageLive notebookId={notebookId} curvenote />
        <h1>World Energy and Economic data</h1>
        <p>
          This article allows us to explore details of the part of the{" "}
          <a href="https://ourworldindata.org/energy">World Energy Dataset</a>{" "}
          compiled by{" "}
          <a href="https://ourworldindata.org/">Our World in Data (OWID)</a>,
          and maintained and distributed{" "}
          <a href="https://github.com/owid/energy-data">on github</a>. The team
          at OWID put together some awesome articles with rich interactive
          content. Here, we're showing how it is possible to do the same by
          developing in a Jupyter notebook and linking that into a{" "}
          <a href="https://curvenote.com">Curvenote</a> article.
        </p>
        <p>
          The dataset contains data on 242 countries/regions from 1990 onwards.
          To start working with the dataset we have filtered down to a smaller
          set of 50 of the countries/regions with higher GDPs.
        </p>
        <h2>About the dataset</h2>
        <p>
          There are a number of different statistics available in the dataset.
          We are interested here at looking at overall consumption of different
          fuel types and how that contributes to eletricity generation.
        </p>
        <p>
          The different types of fuels are:{" "}
          <em>biofuel, coal, gas, hydro, nuclear, oil, solar, wind</em> -- and
          we can examine these in terms of three statistics
        </p>
        <ul>
          <li>consumption</li>
          <li>share of energy usage</li>
          <li>use in electricity generation</li>
        </ul>
        <p>We also have data available from 1990 to 2019</p>
        <h2>Select Countries</h2>
        <p>
          Select any number of the following coutnries to include in the
          analysis. The selections is randomized on page refresh.
        </p>
        {COUNTRIES.map((c, i) => {
          return (
            <div
              key={c.toLowerCase().replace(" ", "_")}
              style={{
                display: "inline-block",
                padding: "0 5px",
                borderRight:
                  i < COUNTRIES.length - 1 ? "1px dashed black" : undefined,
              }}
            >
              <RCheckbox
                label={c}
                value={initialCountryList.indexOf(c) !== -1}
                bindToChange={`{countries: countries.indexOf("${c}") === -1 ? countries.concat(",${c}") : countries.replace("${c},","").replace(",${c}","")}`}
              ></RCheckbox>
            </div>
          );
        })}
        <h2>Gross Domestic Product</h2>
        <p>
          A Country&apos;s Gross Domestic Product, or GDP, is a an indicator of
          the scale of its industrial output, so a key factor to consider when
          looking at energy use.
        </p>
        <p>
          The following figure shows GDP for the selected countries since 1990.
        </p>
        <Output
          notebookId={notebookId}
          cellId="pandas-plot-gdp"
          placeholder={
            <img src="figure-1.png" alt="gdp of selected countries" />
          }
        />
        <h2>Energy usage statistcs</h2>
        <p>
          Next we can look at the energy statistcs for different fueld types for
          these countries. These are shown in both figure and table form below.
        </p>
        <Output
          notebookId={notebookId}
          cellId="pandas-plot-stats"
          placeholder={<img src="figure-2.png" alt="energy statistcs" />}
        />
        <p>
          The data is currently shown is for the year{" "}
          <RDynamic
            bind="selected_year"
            min={1990}
            max={2019}
            step={1}
            format=".0f"
          ></RDynamic>
          , the statistic{" "}
          <RSelect
            bindToValue="selected_stat"
            bindToChange={"{selected_stat: value}"}
            values={["consumption", "electricity", "share_energy"]}
            labels={[
              "Total Consumption",
              "Use in Electricity Prod.",
              "Share of Primary Energy",
            ]}
          ></RSelect>{" "}
          and can also be shown as a{" "}
          <RCheckbox
            label="normalized"
            value={false}
            bind="normalize"
          ></RCheckbox>{" "}
          plot.
        </p>
        <Output
          notebookId={notebookId}
          cellId="pandas-table-stats"
          placeholder={<img src="table-1.png" alt="energy statistcs" />}
        />
      </article>
    </RScope>
  );
}

export default MyArticle;
