import React, { Component, PropTypes } from 'react'
import {$$} from 'webix'
import webix from 'webix'

class Table extends Component {
    static propTypes = {
       data: PropTypes.array
    }
    constructor() {
        super()
    }
    componentDidMount() {
        const container = this.refs.container;
        let tableConfig = this.props.config;
        tableConfig.view = "datatable";
        console.log(JSON.stringify(tableConfig));
        this._table = webix.ui(tableConfig, container);
        window.table = this._table;
    }

    render() {
        this._table && this.update();
        return (
            <div ref="container"></div>
        )
    }

    update() {
        const container = this.refs.container;
        let tableConfig = this.props.config;
        tableConfig.view = "datatable";
        this._table.destructor();
        this._table = webix.ui(tableConfig, container);

    }
    componentWillUnmount() { 
       this._table.destructor();
    }
}

export default Table