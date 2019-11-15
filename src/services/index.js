import Web3 from 'web3';
import { todoAbi, tokenAbi } from './abi';

export const web3 = new Web3(window.ethereum);
export let address;

window.myWeb3 = web3;
window.ethereum.enable().then(result => { address = result[0] })

export const getContract = (address) => new web3.eth.Contract(todoAbi, address);
export const getToken = (address) => new web3.eth.Contract(tokenAbi, address);
