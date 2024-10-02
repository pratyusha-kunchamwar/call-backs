/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 3 seconds
       and rejects after 2 seconds
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well

    5. Print out "Program complete" if the promise fulfills
    6. Print out "Program failure" if the promise rejects

    HINT: Use setTimeout for the delay
*/

function createPromise() {
  return new Promise((resolve, reject) => {
    console.log("Program started");
    setTimeout(() => resolve("Program completed"), 3000);
    setTimeout(() => reject("Program failure"), 2000);
  });
}

// using then ,catch

console.log("Promise in Pending state", promise);
console.log("Program in progress.......");
createPromise()
  .then((resolve) => console.log(resolve))
  .catch((reject) => console.log(reject));

// async await call
async function handlePromise(createPromise) {

  console.log("Promise in Pending state", promise);
  console.log("Program in progress....");
  try {
    let response = await createPromise();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
handlePromise(createPromise);
