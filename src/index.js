import React from 'react'
import { render } from 'react-dom'
import Web3 from 'web3';
import './index.css'

window.web3 = new Web3(window.ethereum);

render(
  <iframe src="https://web3js.readthedocs.io/en/v1.2.0/web3.html" />,
  document.getElementById('root')
)
