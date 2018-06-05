(async function getCustomersOrders() {
  try {
      const customer = await getCustomers();
      console.log(`Got customer ${customer}`);
      const orders = await getOrders(customer);
      console.log(orders);
  } catch(err) {
      console.log(err);
  }
})();

console.log("This is the last line in the app. Chained getCustomers() and getOrders() are still running without blocking the rest of the app.");