pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KarmaToken is ERC20 {
  string public name = "Karma Token";
  string public symbol = "KT";
  uint public decimals = 18;

  constructor() public {
    _mint(msg.sender, 10000 * (10 ** decimals));
  }
}

contract Todos {
    struct TodoItem {
        string text;
        bool completed;
        uint bounty;
    }

    KarmaToken private token;
    address public tokenAddress;
    TodoItem[] todos;
    
    event AddItem(
        uint indexed _index,
        string _text,
        uint _bounty
    );
    
    event CompleteItem(
        uint indexed _index,
        string _text,
        uint _bounty
    );
    
    constructor () public {
        token = new KarmaToken();
        tokenAddress = address(token);
    }
    
    // check that index falls withing todo list range
    modifier checkIndex(uint indexItem) {
        require(indexItem < todos.length);
        _;
    }
    
    // check that item is not completed
    modifier checkAvailability(uint indexItem) {
        require(todos[indexItem].completed == false);
        _;
    }
    
    // add a new todo item with bounty
    function addItem(string memory text)
        public
        payable
    {
        TodoItem memory todoItem = TodoItem(text, false, msg.value);
        todos.push(todoItem);
        
        emit AddItem(todos.length - 1, text, msg.value);
    }
    
    // get the total count of todo items
    function getItemCount()
        public
        view
        returns(uint numItems)
    {
        return todos.length;
    }
    
    // get a single todo item by index
    function getItem(uint indexItem) 
        checkIndex(indexItem)
        public
        view
        returns(TodoItem memory todoItem)
    {
        return todos[indexItem];
    }
    
    // get all todo items
    function getItems()
        public
        view
        returns(TodoItem[] memory todoItems)
    {
        return todos;
    }
    
    // update the text of a todo item
    function updateItemText(uint indexItem, string memory text)
        checkIndex(indexItem)
        public 
    {
        todos[indexItem].text = text;
    }
    
    // update the completeness state of a todo item
    function completeItem(uint indexItem)
        checkIndex(indexItem)
        checkAvailability(indexItem)
        public 
    {
        TodoItem storage todoItem = todos[indexItem];
        todoItem.completed = true;
        msg.sender.transfer(todoItem.bounty);
        token.transfer(msg.sender, 1 ether);
        
        emit CompleteItem(indexItem, todoItem.text, todoItem.bounty);
    }
}
