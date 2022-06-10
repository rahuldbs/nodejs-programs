const promise1 = Promise.resolve(3);
const promise2 = Promise.resolve(42);
const promise3 = new Promise((resolve, reject) => {
    setTimeout(reject, 100, 'test error');
});

Promise.myAllSettled = (promises) => {
    const mappedPromises = promises.map((promise) => promise
        .then((value) => ({ status: "fulfilled", value }))
        .catch((error) => ({ status: "rejected", error }))
    );
    return Promise.all(mappedPromises);
}

Promise.myAllSettled([promise1, promise2, promise3])
    .then((results) => results.forEach(result => console.log(result)))
    .catch((error) => console.log("Error: ", error));