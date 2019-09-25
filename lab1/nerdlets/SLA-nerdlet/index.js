import React from 'react'
import PropTypes from 'prop-types'

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

    render() {
        return <h1>Hello, SLA-nerdlet Nerdlet!</h1>
    }
}
