# LEO Learning interview task

## Requirements

* Node > 12
* Node Package Manager (npm) > 7
* Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/nikhilvn/leo-learning-task-simple.git
cd leo-learning-task-simple
```

```bash
npm install
```

## Step 1 of the task

To run step 1 of the task, run the following command.

```bash
npm run start:step-1
```
### Rational behind step 1

We use the `calculateCheckoutAmount` function to calculate the total checkout amount and also quantities of each item. The function structure is:

```javascript
function calculateCheckoutAmount(cartItems: Item[], isOffersActive?: boolean): {
    items: Map<Item, number>;
    totalCost: number;
}
```
The function takes two arguments: the items array and a boolean to apply offers required for [step 2](#step-2). Inside the function, we use the Map data structure to store the quantities of each item since it integrates neatly with our `Item` type.

```javascript
const itemAmount = new Map<Item, number>();
```

After calculating the quantities, we run the conditional statement to apply offers required for [step 2](#step-2). Lastly, we loop over the items to calculate the total cost of the items.
We use the `printOutput` function to format and print the output to the console.

Sample input:
```javascript
const cart: Item[] = [ "Apple", "Apple", "Orange", "Apple", "Orange", "Orange", "Orange", "Orange"];
const result = calculateCheckoutAmount(cart);
printOutput(result);
```
Output:
```bash
Items:  { Apple: 3, Orange: 5 }
Total cost:  £3.05
```

## Step 2 of the task

To run step 2 of the task, run the following command.

```bash
npm run start:step-2
```

### Rational behind step 2

The modification only for step 2 is the conditional-if block to apply offers. To run the code, we pass the second argument of the `calculateCheckoutAmount` function as `true`.

For the 'Buy one, get one free on Apples' offer, we assumed that the customer finished their shopping and won't add any items to their bag. Considering this, should the offer be applied, the quantities of the items would remain the same, but only the total cost would decrease. 
The following lines of code calculates how many apples in the cart will be charged.

```javascript
const appleAmount = tempItemAmount.get("Apple");
const tempItemAmount.set("Apple", Math.ceil(appleAmount / 2));
```
If there are 5 apples in the cart, then only 3 apples will be charged.

For the '3 for the price of 2 on Oranges' offer, we assumed the quantities of each items to remain the same.
The following lines of code calculates how many oranges in the cart will be charged.

```javascript
const appleAmount = tempItemAmount.get("Apple");
const tempItemAmount.set("Orange", Math.ceil(orangeAmount * (2 / 3)));
```
If there are 5 oranges in the cart, then only 4 oranges will be charged.

Sample input:
```javascript
const cart: Item[] = [ "Apple", "Apple", "Orange", "Apple", "Orange", "Orange", "Orange", "Orange"];
const result = calculateCheckoutAmount(cart, true);
printOutput(result);
```
Output:
```bash
Items:  { Apple: 3, Orange: 5 }
Total cost:  £2.2
```