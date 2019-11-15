import { parse } from 'query-string';
import * as types from '../constants/ActionTypes'
import { getContract, getToken, address, web3 } from '../services'

let contract;
let token;

export const initApp = () => 
    (dispatch) => {
        let contractAddress = parse(window.location.search).address

        if (!contractAddress) {
            contractAddress = prompt("Enter contract address", "0x");
        }
        
        contract = getContract(contractAddress);
        contract.methods.getItems()
            .call()
            .then(items => {
                items.forEach(({ text, completed, bounty }) => dispatch({
                    type: types.ADD_TODO,
                    text,
                    completed,
                    bounty: web3.utils.fromWei(bounty)
                }))
            })

        contract.events.AddItem()
            .on('data', event => {
                if (!event) {
                    return;
                }

                const {
                    _text: text,
                    _bounty: bounty,
                    _index: id,
                } = event.returnValues;

                dispatch({
                    type: types.ADD_TODO,
                    id,
                    text,
                    completed: false,
                    bounty: web3.utils.fromWei(bounty)
                })
            })

        contract.events.CompleteItem()
            .on('data', event => {
                if (!event) {
                    return;
                }

                const {
                    _index: id,
                } = event.returnValues;
                console.log(event)

                dispatch({
                    type: types.COMPLETE_TODO,
                    id: Number(id),
                    completed: true,
                })
            })

        contract.methods.tokenAddress()
            .call()
            .then(tokenAddress => {
                token = getToken(tokenAddress);
                token.methods.balanceOf(address)
                    .call()
                    .then(balance => dispatch(updateKarma(web3.utils.fromWei(balance))))

                token.events.Transfer()
                    .on('data', event => {
                        if (!event) {
                            return;
                        }
        
                        token.methods.balanceOf(address)
                            .call()
                            .then(balance => dispatch(updateKarma(web3.utils.fromWei(balance))))
                    })
            })
    }

export const addTodo = (text) =>
    (dispatch) => {
        const bounty = prompt("Enter bounty amount", "0");
        contract.methods.addItem(text)
            .send({
                from: address,
                value: web3.utils.toWei(bounty),
            })
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
        contract.methods.completeItem(id)
            .send({ from: address })
    }

export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter})

export const updateKarma = karma => ({ type: types.UPDATE_KARMA, karma })
