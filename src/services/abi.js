export default [
	{
		"constant": false,
		"inputs": [
			{
				"name": "text",
				"type": "string"
			}
		],
		"name": "addItem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "indexItem",
				"type": "uint256"
			},
			{
				"name": "completed",
				"type": "bool"
			}
		],
		"name": "updateItemState",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "indexItem",
				"type": "uint256"
			},
			{
				"name": "text",
				"type": "string"
			}
		],
		"name": "updateItemText",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "indexItem",
				"type": "uint256"
			}
		],
		"name": "getItem",
		"outputs": [
			{
				"components": [
					{
						"name": "text",
						"type": "string"
					},
					{
						"name": "completed",
						"type": "bool"
					}
				],
				"name": "todoItem",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getItemCount",
		"outputs": [
			{
				"name": "numItems",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getItems",
		"outputs": [
			{
				"components": [
					{
						"name": "text",
						"type": "string"
					},
					{
						"name": "completed",
						"type": "bool"
					}
				],
				"name": "todoItems",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
