/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 5 seconds with the
       value {data: "Hello, friend!", error: null}
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well

    5. Create a first Promise chain using the promise above and
       Print out the resolved value when the first promise fulfills
    6. Have this first promise return another new Promise that will
       fulfill after 2 seconds with the message:
       "First promise chain complete!"
    7. Print out the message from the above promise after it
       fulfills ("First promise chain complete!")

    8. Create a second Promise chain using the first promise above and
       Print out the resolved value when the second promise fulfills
    9. Have this second promise return another new Promise that will
       fulfill after 10 seconds with the message:
       "Second promise chain complete!"
   10. Print out the message from the above promise after it
       fulfills ("Second promise chain complete!")

    HINT: Use setTimeout for the delay
    HINT2: This will be using the same promise two times:
           const myPromise = new Promise(...) // step 2
           myPromise.then(...).then(...) // steps 5-7
           myPromise.then(...).then(...) // steps 8-10

    BONUS: WHY does it work this way?
*/

const mainPromise = new Promise((resolve) => {
  console.log("Program started");
  setTimeout(() => resolve({ data: "Hello, friend!", error: null }), 5000);
});

function subPromise(message, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(message), delay);
  });
}

// execution with then ,catch
console.log("Promise is pending", mainPromise);
console.log("Program in progress...");

mainPromise
  .then((resolve) => {
    console.log(resolve);
    return subPromise("first promise chain completed", 2000);
  })
  .then((resolve) => console.log(resolve))
  .catch((error) => console.error("Error in first chain", error));

//second chain
mainPromise
  .then((resolve) => {
    console.log(resolve);
    return subPromise("second Promise Chain completed", 10000);
  })
  .then((message) => console.log(message))
  .catch((error) => console.error("Error in second chain", error));

// async ,await
let handlePromise = async (mainPromise) => {
  console.log("Promise is pending", mainPromise);
  console.log("Program in progress...");
  try {
    let response = await mainPromise;
    console.log(response);
    let response1 = await subPromise("first promise chain completed",2000);
    console.log(response1);
    console.log(response);
    let response2 = await subPromise("Second Promise chain Complete",10000);
    console.log(response2);
  } catch {
    console.error("Error while handling the promises");
  }
};
handlePromise(mainPromise);
