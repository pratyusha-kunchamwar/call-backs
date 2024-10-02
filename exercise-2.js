/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 3 seconds
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well

    5. Print out "Step 1 complete" when the first promise fulfills
    6. Have the first promise return another new Promise that will
       fulfill after 3 seconds with the message: "Step 2 Complete"

    7. Print out the message from the second promise after it
       fulfills ("Step 2 Complete")

    HINT: Use setTimeout for the delay
*/
// first promise
let mainPromise = new Promise((resolve) => {
  console.log("Program started");
  setTimeout(() => resolve("Step 1 complete"), 3000);
});

//second promise
let subPromise = new Promise((resolve) =>
  setTimeout(() => resolve("Step 2 complete"), 3000)
);


//using then catch
console.log("Promise pending state ", mainPromise);
console.log("Promise in progress ......");
mainPromise
  .then((resolve) => {
    console.log(resolve);
    return subPromise;
  })
  .then((resolve) => console.log(resolve))
  .catch(() => console.error("error in promises"));

//using async,await
let handlePromise = async (mainPromise) => {
  console.log("Promise pending state ", mainPromise);
  console.log("Promise in progress ......");
  try {
    let response = await mainPromise;
    console.log(response);
    let response1 = await subPromise;
    console.log(response1);
  } catch (error){
    console.log("error in the promises",error);
  }
};
handlePromise(mainPromise);
