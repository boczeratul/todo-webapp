import React from 'react'
import { render } from 'react-dom'
import Web3 from 'web3';
import './index.css'

const testWeb3 = new Web3(window.web3.currentProvider);
window.web3 = testWeb3;

render(
  <div>Will trigger batch TX and show responses</div>,
  document.getElementById('root')
)

// alert(window.web3.currentProvider.isBlocto);

setTimeout(() => {
  testWeb3.eth.getAccounts().then(address => {
    testWeb3.eth.sendTransaction({
      from: address[0],
      to: "0x0bb626E437d9DDd4A9c0cfaA1813091F62a104C1",
      value: "0"
    }, (err, response) => alert(response)).then((response) => alert(JSON.stringify(response)))
  });

  // testWeb3.eth.getAccounts().then(address => {
  //   console.log(address[0]);
  //   var batch = new testWeb3.BatchRequest();
  //   batch.add(testWeb3.eth.sendTransaction.request({from: address[0], to:'0x0bb626E437d9DDd4A9c0cfaA1813091F62a104C1', value: '0'}, (err, response) => alert(JSON.stringify(response))));
  //   batch.add(testWeb3.eth.sendTransaction.request({from: address[0], to:'0x0bb626E437d9DDd4A9c0cfaA1813091F62a104C1', value: '0'}, (err, response) => alert(JSON.stringify(response))));
  //   batch.execute();
  // })
}, 1000)
