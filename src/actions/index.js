import { parse } from 'query-string';
import * as types from '../constants/ActionTypes'
import { getContract, address } from '../services'

let contract;

export const initApp = () => 
    (dispatch) => {
        let address = parse(window.location.search).address

        if (!address) {
            address = prompt("Enter contract address", "0x");
        }
        
        contract = getContract(address);
        contract.methods.getItems()
            .call()
            .then(items => {
                items.forEach(item => dispatch({ type: types.ADD_TODO, ...item }))
            })
    }

export const addTodo = (text) =>
    (dispatch) => {
        contract.methods.addItem(text)
            .send({ from: address })
            .then(() =>
                dispatch({ type: types.ADD_TODO, text, completed: false })
            )
    }

export const editTodo = (id, text) => 
    (dispatch) => {
        contract.methods.updateItemText(id, text)
            .send({ from: address })
            .then(() =>
                dispatch({ type: types.EDIT_TODO, id, text })
            )
    }

export const completeTodo = (id, completed) =>
    (dispatch) => {
        contract.methods.updateItemState(id, completed)
            .send({ from: address })
            .then(() =>
                dispatch({ type: types.COMPLETE_TODO, id, completed })
            )
    }

export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter})
