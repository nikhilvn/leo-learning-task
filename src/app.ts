type Item = "Apple" | "Orange";

const itemCosts = {
  Apple: 60,
  Orange: 25,
};

function calculateCheckoutAmount(cartItems: Item[], isOffersActive = false) {
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

  const tempItemAmount = new Map(itemAmount);

  if (isOffersActive) {
    // Buy one, get one free on Apples
    const appleAmount = tempItemAmount.get("Apple");
    if (appleAmount) {
      tempItemAmount.set("Apple", Math.ceil(appleAmount / 2));
    }

    // 3 for the price of 2 on Oranges
    const orangeAmount = tempItemAmount.get("Orange");
    if (orangeAmount) {
      tempItemAmount.set("Orange", Math.ceil(orangeAmount * (2 / 3)));
    }
  }

  tempItemAmount.forEach((amount, item) => {
    totalCost += amount * itemCosts[item];
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
  "Orange",
  "Orange",
];

if (process.argv[2] && process.argv[2] === "--offer") {
  const result = calculateCheckoutAmount(cart, true);
  printOutput(result);
} else {
  const result = calculateCheckoutAmount(cart);
  printOutput(result);
}
