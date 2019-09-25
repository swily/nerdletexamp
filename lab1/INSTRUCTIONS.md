Lab 1: Working with the Vizco libraries
===========================================================

[Vizco](https://pages.datanerd.us/dataviz/vizco-core/) is a charting library that delivers outstanding data visualizations across New Relic products. Vizco includes Chart Components, built as a set of React components, that allow you to easily add data visualizations to New Relic products. The components take care of everything: from ploting to fetching data from the CDS. All components are fully configurable.
The purpose of this lab is to create a Nerdlet that displays data from a custom NRQL query using the [Vizco libraries](https://pages.datanerd.us/dataviz/vizco-core/). It provides hands-on experience interacting with the NR1 CLI, Vizco, and NR-UI components.

After completing this lab you should understand:

* The basics for interacting with the Vizco and NR-UI libraries in a custom Nerdlet

## Step 0: Setup and Prerequisites

Load the prequisites and follow the setup instructions in [Setup and Prequisites](../SetupAndPrerequisites.md). Make sure to set the npm registry and run npm install to download the required node modules. You'll need to follow these for every lab exercise, but don't worry, it'll be faster for you as you get _reps._

**Reminder**: Make sure that you're ready to go with your `lab1` by ensuring you've run the following commands:

```bash
# if we're not in the lab1 directory get there
cd ../lab1
npm install
```

## Step 1: Creating a new Nerdlet with nr1-pkg

The nerdlet code that you create in this exercise will be accessed through a prebuilt launcher that is delivered as part of Lab 1. We will cover the details of launchers in a future exercise.

1. Run the following commands:

```bash
#Assuming we're in the lab1 directory
nr1-pkg add nerdlet lab1-nerdlet
npm start
```

You'll notice that the CLI creates three files: index.js, styles.scss, and a nr1.json configuration.

2. Open the file `nerdlets/lab1-nerdlet/nr1.json` and replace the `actionCategory` equal to `monitor`. Save the file.
3. Assuming the the developer server is still running (i.e. `npm start`), validate (in a web browser) that you can click on and see the `Lab 1 Launcher` launcher.

4. Change the display name of the Nerdlet in `nerdlets/lab1-nerdlet/nr1.json` and save that file.

5. Shut down the running `npm` process and restart the service to pick up the change to the `nr1.json`. _Note that changes to the nr1.json files are the only changes that the CLI doesn't automatically notice and reload. So anytime you make a change to an nr1.json file, you'll need to restart your local server._

```bash
#Press Ctrl+C to end the running process started by the previous npm start
npm start
```

6. Now open a web browser to <https://staging-one.newrelic.com?packages=local>. After clicking on the `Lab 1 Launcher`, you should see a screen like the one below.

![lab1-nerdlet](../screenshots/lab1_screen01.png)

7. Add the following code to the `index.js` just above the `render` method and save the file. (_We're going to explore the Nerdlet props via the browser Dev Tools._)

```javascript
    constructor(props) {
        super(props)
        console.debug(props)
        this.account_id = 1
        this.state = {
            appId: null,
            appName: null
        }
    }
```

8. Ctrl+click (or right click) on the web browser screen displaying our Nerdlet and choose the menu item `Inspect`.
9. In the DevTools window now open, click on the `Console` tab at the top.
10. In the `Console` tab, choose the `verbose` option on the left hand side. (It's in the drop-down next to the 'Filter' bar.)
11. Go back to the browser window and reload the current page, and then go back to the DevTools window. You should be looking at a screen like the following:
![Dev Tools > Console > verbose](../screenshots/lab1_screen02.png)
You may get a notification at the top of your debug window indicating that you do not have the 'React DevTools' loaded. If you would like to load the [React DevTools extension](https://github.com/facebook/react-devtools), you can click on this link and load the [chrome extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) (or [firefox exetension](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)). You should become familiar with using the developer tools as a way to explore the values of your objects on the client. Take a moment now to explore the objects returned to the console.

12. Explore the `properties` passed into the Nerdlet using the `Console`. This will give you an initial sense of the data and capabilities that are part of the _context_ of each Nerdlet.

## Step 2: Exploring the Vizco library

1. Open a browser window to <https://pages.datanerd.us/dataviz/vizco-core/docs/>. In the next section, we're going to make use of several components described in this documentation.
2. Find the `TableComponent` documentation and explore its Usage, Example, and Config content.
3. Find the `ScatterComponent` documentation and explore its Usage, Example, and Config content.
4. Find the `LineComponent` documentation and explore its Usage, Example, and Config content.
5. Find the `DefaultWidget` documentation and explore its Usage, Example, and Config content.
6. Find the `ChartGroupComponent` documentation and explore its usage and example content.
7. Find the `GenericComponent` documentation and explore its details.

In the next few sections, we're going to create an interface that explores the relationship between the volume of transactions over time and **apdex** metric using the components we just reviewed.

## Step 3: Building a table component into our Nerdlet

1. Run the following command to ensure the vizco library is included in your project:

```bash
# assuming in the workshop/lab1 directory
npm install --save @datanerd/vizco
```

2. Add the following to `lab1/nerdlets/lab1-nerdlet/styles.scss` and save the file.

```css
@import '~@datanerd/vizco/dist/vizco.css';
.lab1Container {
    margin-left: 20px;
    margin-right: 20px;
    width: 100%;
    height: 100vh;
    .containerRow {
        height: 45%;
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
        & > div {
            display: flex;
            flex-direction: row;
        }
        .containerChart {
            padding: 20px 20px 20px 0px;
            width: 48%;
            height: 100%;
        }
    }
}
```

_Note that we're both importing external css from libraries and defining our own CSS rules in the styles.scss._

3. Add the following import statement near the top of `lab1/nerdlets/lab1-nerdlet/index.js`. This will bring in the TableComponent from the datanerd npm lirary that you named in the setup and prerequisites step.

```javascript
import { TableComponent } from '@datanerd/vizco'
```

4. Now, let's use the TableComponent to display a simple table with apdex information. Replace the `render` method of `lab1/nerdlets/lab1-nerdlet/index.js` with the following, save the file, and validate the the component renders. The nerdlet framework will recognize the `query` object passed as an argument into the `TableComponent` in the `render` method, and will, under the covers, execute the NRQL statement as part of a GraphQL query.


```javascript
    render(){
        const { appId, appName } = this.state
        //an object containing the account_id and nrql query
        const query = {
            account_id: 1,
            nrql: `SELECT count(*) as 'transactions', apdex(duration) as 'apdex', percentile(duration, 99, 90, 70) FROM Transaction facet appName, appId limit 25`
        }
        //return the JSX we're rendering
        return (
            <div className="lab1Container">
                <div className="containerRow">
                    <TableComponent query={query} />
                </div>
            </div>
        )
    }
```

![Table Component](../screenshots/lab1_screen03.png)

## Step 4: Adding the detail components

In this step, we're going to add two detail charts and wrap them in a grouping component that will [ensure synchronized effects across the two charts](https://pages.datanerd.us/dataviz/vizco-core/docs/other-components/chart-group-component/).

1. Add the following import statement near the top of `lab1/nerdlets/lab1-nerdlet/index.js`.

```javascript
import { ChartGroupComponent, GenericComponent, DefaultWidget } from '@datanerd/vizco'
```

2. We're going to add several components (spelled out in the block of code further below) to the `render` method:
    - a `ChartGroupComponent`
    - within the `ChartGroupComponent` a `DefaultWidget` with a type of `GenericComponent.CHART_LINE` to chart the timeseries number of transactions using the NRQL query `SELECT count(*) FROM Transaction WHERE appId = ${appId} TIMESERIES` as the source of its data.
    - within `ChartGroupComponent` a `DefaultWidget` with a type of `GenericComponent.SCATTER_CHART` to plot the duration of requests over time using the NRQL query `SELECT apdex(duration) FROM Transaction WHERE appId = ${appId} TIMESERIES` as the source of its data.

That all results in the following block of code. Copy/reproduce the code below as the replacement for the `render` method of the `index.js` file:

```javascript
     render() {
        const { appId, appName } = this.state
        const query = {
            account_id: this.account_id,
            nrql: `SELECT count(*) as 'transactions', apdex(duration) as 'apdex', percentile(duration, 99, 90, 70) FROM Transaction facet appName, appId limit 25`
        }
        const detailContent = appId ?
            (<div className="containerRow">
                <ChartGroupComponent>
                    <div className="containerChart">
                        <DefaultWidget
                            title={`Transactions over Time for ${appName}`}
                            type={GenericComponent.CHART_LINE}
                            query={{
                                account_id: this.account_id,
                                nrql: `SELECT count(*) FROM Transaction WHERE appId = ${appId} TIMESERIES`
                            }}
                        />
                    </div>
                    <div className="containerChart">
                        <DefaultWidget
                            title={`Apdex Plot for ${appName}`}
                            type={GenericComponent.CHART_SCATTER}
                            query={{
                                account_id: this.account_id,
                                nrql: `SELECT apdex(duration) FROM Transaction WHERE appId = ${appId} TIMESERIES`
                            }}
                        />
                    </div>
                </ChartGroupComponent>
            </div>) : null
        return (
            <div className="lab1Container">
                <div className="containerRow">
                    <TableComponent
                        query={query}
                    />
                </div>
                {detailContent}
            </div>
        )
    }
```

_Note that the `{detailContent}` block is either empty or contains the `ChartGroupComponent` contents depending on whether or not the `state.appId` is NULL or not. Also, it would be helpful to explore the various properties we're passing into the `DefaultWidget` components and ensure you understand (or ask questions about) precisely what those attributes are._

3. Save the file and reload the site/page.

Note that the second row of additional charts is never drawm because the `state.appId` is always NULL. There's presently no way to set its value. Let's fix that.

4. Add the following method to your nerdlet React component, e.g. after the `contructor(props)` we added above:

```javascript
    setApplication(inAppId, inAppName) {
        this.setState({ appId: inAppId, appName: inAppName })
    }
```

5. Add a new attribute named `config` to the existing `TableComponent` as a way to [configure a `click` event](https://pages.datanerd.us/dataviz/vizco-core/docs/chart-components/table-component/) on the table rows:

```javascript
    <TableComponent
        query={query}
        config={{
            table: {
                onClick: (column, point, series, chart) => {
                    //for learning purposes, we'll write to the console here.
                    console.log([column, point, series, chart])
                    this.setApplication(point.appId, point.appName)
                }
            }
        }}
    />
```

6. The resulting `index.js` should look like the following:

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import { TableComponent } from '@datanerd/vizco'
import { ChartGroupComponent, GenericComponent, DefaultWidget } from '@datanerd/vizco'

/**
 * @see https://pages.datanerd.us/wanda/wanda-ec-ui/v1/class/src/artifacts/nerdlet/Nerdlet.js~Nerdlet.html
 */
export default class MyNerdlet extends React.Component {
    static propTypes = {
        entity: PropTypes.object,
        entities: PropTypes.array,
        entityCount: PropTypes.object,
        entitiesById: PropTypes.object,
        entitiesByDomainType: PropTypes.object,
        relationshipsById: PropTypes.object,
        summaryDataById: PropTypes.object,
        isLoadingEntities: PropTypes.bool,
        headerState: PropTypes.object,
        nr1: PropTypes.object,
        width: PropTypes.number,
        height: PropTypes.number,
    }

    constructor(props) {
        super(props)
        console.debug(props)
        this.account_id = 1
        this.state = {
            appId: null,
            appName: null
        }
    }

    setApplication(inAppId, inAppName) {
        this.setState({ appId: inAppId, appName: inAppName })
    }

    render() {
        const { appId, appName } = this.state
        const query = {
            account_id: this.account_id,
            nrql: `SELECT count(*) as 'transactions', apdex(duration) as 'apdex', percentile(duration, 99, 90, 70) FROM Transaction facet appName, appId limit 25`
        }
        const detailContent = appId ?
            (<div className="containerRow">
                <ChartGroupComponent>
                    <div className="containerChart">
                        <DefaultWidget
                            title="Transactions over Time"
                            type={GenericComponent.CHART_LINE}
                            query={{
                                account_id: this.account_id,
                                nrql: `SELECT count(*) FROM Transaction WHERE appId = ${appId} TIMESERIES`
                            }}
                        />
                    </div>
                    <div className="containerChart">
                        <DefaultWidget
                            title="Apdex Plot"
                            type={GenericComponent.CHART_SCATTER}
                            query={{
                                account_id: this.account_id,
                                nrql: `SELECT apdex(duration) FROM Transaction WHERE appId = ${appId} TIMESERIES`
                            }}
                        />
                    </div>
                </ChartGroupComponent>
            </div>) : null
        return (
            <div className="lab1Container">
                <div className="containerRow">
                    <TableComponent
                        query={query}
                        config={{
                            table: {
                                onClick: (column, point, series, chart) => {
                                    //for learning purposes, we'll write to the console here.
                                    console.log([column, point, series, chart])
                                    this.setApplication(point.appId, point.appName)
                                }
                            }
                        }}
                    />
                </div>
                {detailContent}
            </div>
        )
    }
}
```

7. Save the file and reload the site/page. You should be able to click on an application and see the resulting second row of charts. :sparkles:

![Full example](../screenshots/lab1_screen04.png)

## Extra Credit: Adding a second summary chart

Based on what you've applied above, try to do the following:

1. Add an import statement to include a `LineComponent`
2. Next to the `TableComponent` in the first `containerRow`, add a `LineComponent` using the following NRQL query: `SELECT count(*) as 'transactions' FROM Transaction facet appName, appId limit 25 TIMESERIES`

_Note that you'll need to wrap both the `TableComponent` and `LineComponent` each in a `div` with a `className` property of `containerChart`_.

3. Add a `config` object/property to your `LineComponent` that processes `onClick` events in the same way that the `TableComponent` `config.onClick` functions (setting the `state.appId` and `state.appName`). To make that work, you'll want to use this config.onClick definition in your `LineComponent`:

```javascript
<LineComponent
    query={{
        account_id: this.account_id,
        nrql: "SELECT count(*) as 'transactions' FROM Transaction facet appName, appId limit 25 TIMESERIES"
    }}
    config={{
        line: {
            onClick: (series, chart) => {
                //more console logging for learning purposes
                console.log([series, chart])
                const params = series.metadata.label.split(",")
                this.setApplication(params[1], params[0])
            }
        }
    }}
/>
```

![Something like this](../screenshots/lab1_screen05.png)

_Note: the answer to this part (and the whole exercise) is the basis for `lab2` so you'll see it working there._

# For Consideration / Discussion

- What was the purpose of the `ChartGroupComponent`? What is it doing for us?
- Why did we use a `DefaultWidget` for the second row of content vs. a `LineComponent` and `ScatterComponent`?
