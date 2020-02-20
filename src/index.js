import React from 'react'
import { render } from 'react-dom'
import Web3 from 'web3';
import './index.css'

window.web3 = new Web3(window.ethereum);

window.web3.eth.getAccounts().then(address => {
  console.log(address);
  window.web3.eth.sendTransaction({
    from: address[0],
    to: "0x0bb626E437d9DDd4A9c0cfaA1813091F62a104C1",
    value: "0"
  }, () => alert('callback 1')).then(() => alert('callback 2'))
});

render(
  <iframe src="https://web3js.readthedocs.io/en/v1.2.0/web3.html" />,
  document.getElementById('root')
)
