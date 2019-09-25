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
        this.account_id = 1584027
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
            nrql: `SELECT count(*) as 'transactions', apdex(duration) as 'apdex time', percentile(duration, 99, 90, 70) FROM Transaction facet appName, appId limit 25`
        }
        const detailContent = appId ?
            (<div className="containerRow">
                <ChartGroupComponent>
                    <div className="containerChart">
                        <DefaultWidget
                            title="timetoDomInteractive"
                            type={GenericComponent.CHART_LINE}
                            query={{
                                account_id: this.account_id,
                                nrql: `SELECT average(timeToDomInteractive) FROM BrowserInteraction WHERE appId = ${appId} TIMESERIES`
                            }}
                        />
                    </div>
                    <div className="containerChart">
                        <DefaultWidget
                            title="Apdex Plot"
                            type={GenericComponent.CHART_SCATTER}
                            query={{
                                account_id: this.account_id,
                                nrql: `SELECT apdex(duration, t: .35) FROM Transaction WHERE appId = ${appId} SINCE 1 week ago TIMESERIES`
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