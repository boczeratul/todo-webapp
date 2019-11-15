const Todos = artifacts.require('Todos');

const BN = web3.utils.BN;

const getBalance = async (address) => new BN(await web3.eth.getBalance(address));

async function tryCatch(promise, reason) {
  try {
    await promise;
  }
  catch (error) {
    const isErrorOccur = error.message.includes(reason);
    assert.equal(isErrorOccur, true, `Expected to fail with ${reason}, but failed with: ${error.message}`);
  }
};

contract('Todos', (accounts) => {
  let todos;

  beforeEach('setup contract for each test', async () => {
    todos = await Todos.new();
  });

  describe('addItem()', () => {
    it('should addItem correctly', async () => {
      await todos.addItem("test");
      const itemCount = await todos.getItemCount();

      assert.equal(itemCount, 1);
    });

    it('should addItem and get AddItem event correctly without bounty', async () => {
      const { logs } = await todos.addItem("test", { from: accounts[0], value: 0 });
      const itemCount = await todos.getItemCount();
      const eventIndex = logs.findIndex(log => log.event === 'AddItem');

      assert.equal(itemCount, 1);
      assert.equal(logs[eventIndex].args._index, 0);
      assert.equal(logs[eventIndex].args._text, "test");
      assert.equal(logs[eventIndex].args._bounty, 0);
    });

    it('should addItem and get AddItem event correctly with bounty', async () => {
      const { logs } = await todos.addItem("test again", { from: accounts[0], value: 1e+18 });
      const itemCount = await todos.getItemCount();
      const eventIndex = logs.findIndex(log => log.event === 'AddItem');

      assert.equal(itemCount, 1);
      assert.equal(logs[eventIndex].args._index, 0);
      assert.equal(logs[eventIndex].args._text, "test again");
      assert.equal(logs[eventIndex].args._bounty, 1e+18);
    });

    it('should addItem multiple times', async () => {
      await todos.addItem("test", { from: accounts[0], value: 1e+18 });
      await todos.addItem("test again", { from: accounts[0], value: 1e+18 });
      const itemCount = await todos.getItemCount();

      assert.equal(itemCount, 2);
    });
  });

  describe('getItem()', () => {
    it('should check index range', async () => {
      await todos.addItem("test");
      await tryCatch(todos.getItem(1), 'out of range');
    });

    it('should return correct item', async () => {
      await todos.addItem("test");
      await todos.addItem("test2");
      await todos.addItem("test3");
      const item = await todos.getItem(2);

      assert.equal(item.text, "test3");
      assert.equal(item.completed, false);
    });
  });

  describe('getItems()', () => {
    it('should return correct count', async () => {
      await todos.addItem("test");
      await todos.addItem("test2");
      await todos.addItem("test3");
      const itemCount = await todos.getItemCount();

      assert.equal(itemCount, 3);
    });
  });

  describe('updateItemText()', () => {
    it('should check index range', async () => {
      await todos.addItem("test");
      await tryCatch(todos.updateItemText(1, "something else"), 'out of range');
    });

    it('should update text correctly', async () => {
      await todos.addItem("test");
      await todos.addItem("test2");
      await todos.updateItemText(1, "something else");
      const item = await todos.getItem(1);

      assert.equal(item.text, "something else");
      assert.equal(item.completed, false);
    });
  });

  describe('completeItem()', () => {
    it('should check index range', async () => {
      await todos.addItem("test");
      await tryCatch(todos.completeItem(1), 'out of range');
    });

    it('should complete item correctly', async () => {
      await todos.addItem("test");
      await todos.addItem("test2");
      await todos.completeItem(1);
      const item = await todos.getItem(1);

      assert.equal(item.text, "test2");
      assert.equal(item.completed, true);
    });

    it('should complete item and receive bounty', async () => {
      await todos.addItem("test", { from: accounts[0], value: 1e+18 });
      await todos.addItem("test2");

      const initialBalance = await getBalance(accounts[0]);

      const item = await todos.getItem(0);
      const { receipt } = await todos.completeItem(0);
      const finalBalance = await getBalance(accounts[0]);

      // check balance
      assert(
        finalBalance
          .sub(initialBalance)
          .add((new BN(receipt.gasUsed)).mul(new BN(2e+10)))
          .eq(new BN(item.bounty))
      );
    });

    it('should completeItem and get correct event', async () => {
      await todos.addItem("test", { from: accounts[0], value: 1e+18 });
      const { logs } = await todos.completeItem(0);
      const eventIndex = logs.findIndex(log => log.event === 'CompleteItem');

      assert.equal(logs[eventIndex].args._index, 0);
      assert.equal(logs[eventIndex].args._text, "test");
      assert.equal(logs[eventIndex].args._bounty, 1e+18);
    });
  });
});
