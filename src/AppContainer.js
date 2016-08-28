import React, { Component, PropTypes } from "react";
import Table from "./Table";
import {dataStore} from "./stores";
import {deleteById, addRandom, update} from  "./actions/data"

const TABLEMODE = "table"
const JSONMODE = "json"

class AppContainer extends Component {
    constructor() {
        super();
    }

    state = {
        mode: TABLEMODE,
        data: dataStore.getAll() 
    }

    componentDidMount() {
       dataStore.addChangeListener(this.change);
    }

    componentWillUnmount() {
       dataStore.remoChangeListener(this.change);
    }

    change = () => {
        this.setState({
            data: dataStore.getAll()
        });
    }

    render() {
        const handleChange = this.handleChangeMode.bind(this)
        return (
            <div>
                <div> 
                    <input type="radio" name="type" value={TABLEMODE} onChange={handleChange} checked={this.state.mode === TABLEMODE} /> webix DataTable
                    <input type="radio" name="type" value={JSONMODE} onChange={handleChange} checked={this.state.mode === JSONMODE}/> JSON 
                </div>
                <div>
                    {this.state.mode === TABLEMODE ? this.tableView() : this.jsonView() } 
                </div>
                <div>
                    <input onClick ={this.handleAdd} type= "button" value = "Add new"/>
                </div>
            </div>
        )
    }

    handleChangeMode(e) {
        this.setState({"mode": e.currentTarget.value})
    }

    handleAdd(e) {
        addRandom();
    }

    tableView() {
        console.log(this.state.data)
        const config = {
            data: this.state.data,
            columns:[
                { id:"rank", header:"", css:"rank", editor:"text", adjust:"data" },
                { id:"title", header: "Film title", editor:"text", adjust:"data" },
                { id:"year", header: "Year", editor:"text", adjust:"data"},
                { id:"votes", header:"Rate", editor:"text", adjust:"data"},
                { template: "<input type='button' class='webix_button delete_button' value='Remove'></span>"}
            ],
            onClick:{
                "delete_button" : function(ev, id){
                    deleteById(id.row);
                },
            },
            on: {
                "onAfterEditStop": function(state, editor, ignoreUpdate){
                    update(editor.row, editor.column, state.value);
                }
            },
            editable:true,
            editaction:"dblclick",
            autoheight: true,
            autowidth: true
        };
        return <Table config={config}/>
    }

    jsonView() {
        return (
            <pre>
            {JSON.stringify(this.state.data, null, 2)}
            </pre>
        )
    }
}

export default AppContainer