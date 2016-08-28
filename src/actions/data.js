import AppDispatcher from "../dispatcher"
import { DELETE, ADD_RANDOM, UPDATE } from "./constants"

const randomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
};

export function deleteById(id) {
    AppDispatcher.dispatch({
        type: DELETE,
        data: {id}
    });
}

export function addRandom() {
    AppDispatcher.dispatch({
        type: ADD_RANDOM,
        data: {
            "id": Math.random(),
            "title": "Film #" + randomInteger(0, 100),
            "year": 1950 + randomInteger(0, 60),
            "votes": randomInteger(100, 999999),
            "rating": randomInteger(0,10),
            "rank": randomInteger(0,10)
        }
    });
}

export function update(id, column, value) {
    AppDispatcher.dispatch({
        type: UPDATE,
        data: {
            id,
            column,
            value
        }
    });
}