// let myPromise = new Promise((resolve, reject) => {

//     let dado = Math.floor(Math.random() * 6) + 1;

//     if (dado % 2 === 0) {
//         resolve("par");
//     } else {
//         reject("impar");
//     }
// });

// myPromise.then(
//     function(value) {console.log(value);},
//     function(error) {console.log(error);}
// );

function delayPromise(message, delay){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(message);
        }, delay);
    });
}