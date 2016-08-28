import {EventEmitter} from "events";
import AppDispatcher from "../dispatcher";
import {DELETE, ADD_RANDOM, UPDATE} from "../actions/constants"
const CHANGE_EVENT = "CHANGE_EVENT";

class Store extends EventEmitter{
    constructor(initialState) {
        super();
        this.__items = initialState;
        AppDispatcher.register((action) => {
            const {type, data} = action;
            switch (type) {
                case DELETE:
                    this.delete(data.id);
                    this.emitChange();
                break;
                case ADD_RANDOM:
                    this.add(data);
                    this.emitChange();
                break;
                case UPDATE:
                    let item = this.getById(data.id)
                    item[data.column] = data.value;
                    this.delete(data.id);
                    this.add(item);
                break;
            }
        })
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getAll() {
        return this.__items.slice();
    }

    getById(id) {
        return this.__items.filter((item) => item.id == id)[0];
    }

    add(item) {
        this.__items.push(item);
    }

    delete(id) {
        this.__items = this.__items.filter(item => item.id != id);
    }
}
 
 export default Store 
