/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 3 seconds
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well
    5. Print out "Program complete" when the promise completes after 3 seconds

    HINT: Use setTimeout for the delay
*/


//promise creation
let promise = new Promise((resolve) => {
  console.log("Program started");
  setTimeout(() => resolve("Program completed"), 3000);
});

//using then and catch
console.log("Promise pending state", promise);
console.log("program in progress.......");
promise
    .then((resolve) => console.log(resolve))
    .catch(() => console.log("promise is not successful"));

//using async,await
let handlePromise = async (promise) => {
    console.log("Promise pending state", promise);
    console.log("program in progress.......");
    try {
        let response = await promise;
        console.log(response);
    }
    catch (error) {
        console.error("Promise is not successful")

    }
}
handlePromise(promise)

