import Web3 from 'web3';
import abi from './abi';

export const web3 = new Web3(window.ethereum);
export let address;

window.ethereum.enable().then(result => { address = result[0] })

export const getContract = (address) => new web3.eth.Contract(abi, address);
