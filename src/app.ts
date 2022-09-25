type Item = "Apple" | "Orange";

const itemCosts = {
  Apple: 60,
  Orange: 25,
};

function calculateCheckoutAmount(cartItems: Item[]) {
  let totalCost = 0;
  const itemAmount = new Map<Item, number>();

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    if (!itemAmount.has(item)) {
      itemAmount.set(item, 0);
    }

    const amount = itemAmount.get(item);
    if (amount !== undefined) {
      itemAmount.set(item, amount + 1);
    }
  }

  itemAmount.forEach((amount, item) => {
    const cost = itemCosts[item];
    if (cost) {
      totalCost += amount * cost;
    }
  });

  return {
    items: itemAmount,
    totalCost,
  };
}

function printOutput(result: { items: Map<Item, number>; totalCost: number }) {
  let totalCost = "";
  if (result.totalCost > 100) {
    totalCost = `£${result.totalCost / 100}`;
  } else {
    totalCost = `${result.totalCost}p`;
  }
  console.log("Items: ", Object.fromEntries(result.items));
  console.log("Total cost: ", totalCost);
}

const cart: Item[] = [
  "Apple",
  "Apple",
  "Orange",
  "Apple",
  "Orange",
  "Orange",
  "Apple",
];
const result = calculateCheckoutAmount(cart);

printOutput(result);
