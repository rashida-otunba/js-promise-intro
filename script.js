//Promises are a way for JS to tell the browser to return a value
//GET request; there is an amoun of time between 
//AJAX - made the web more interactive; less data up front 

// console.log("this is the JS promise lesson  ");

//this will allow data to load automatically 

// function got() {
//     return fetch("https://anapioficeandfire.com/api/characters/583");
// console.log(got());
// };

//pass functions to the .thens 
//create separate function to print them 

const loadFromStorage = key => {
    return new Promise((resolve, reject) => {
        const raw = localStorage.getItem(key);

        if (raw) {
            const data = JSON.parse(raw); //JSON.parse is a method that will transition the value to correct JSON syntax 
            resolve(data);
        } else {
            reject(key);
        }
    })
}

const retrieveFromAPI = key => {
    return fetch(`https://anapioficeandfire.com/api/characters/${key}`)
        .then(getJSON)
}

//how to obtain value from more than one data 

const fetchHouse = houseURL => fetch(`https://anapioficeandfire.com/api/houses/${houseURL}`)
    .then(getJSON);

//map array to return new arrays 

const retrieveHouseFromAPI = houses => {
    const fetchArray = houses.map(houseURL => fetchHouse(houseURL))  //we are trying to obtain a list of all house urls from the array; you can reuse the const houseURL array because it is not globally declared in line 37 
    console.log(fetchArray);
    return Promise.all(fetchArray);
}

//extract specific houses from a character

const extractHousesFromCharacter = character => { //in API example, the houses are under the "allegiances" label 
    const { allegiances } = character;
    return allegiances;

}

const addHousestoCharacter = character => {
    return retrieveHouseFromAPI(extractHousesFromCharacter(character))
        .then(houseArray => {
            character.allegiances = houseArray;
            return character; 
        });
}

const getJSON = response => {
    if (response.status === 200) {
        return response.json();
    } else {
        console.log("Bad error code is", response.status);
        throw new Error(`Bad Status Code ${response.status}`);
    }
}

const logData = data => {
    console.log(data);
    return (data); // nothing below return will run so no need to run console.log because it will not run 
}

const extractAliases = character => {//since you have more than one item, you must use curly brackets 
    const { aliases } = character;
    return aliases;
}

const printAliases = aliases => {
    for (let a of aliases) {
        console.log(a);
    }
    return aliases.length
}

const reportError = () => {
    console.log("there was an error!");
    return 0;

}

const printSummary = (howMany) => {
    console.log(`we printed ${howMany} aliases`);
}

// const promise = new Promise((resolve, reject) => {//expecting a callback function 
//     resolve(42);

// })

// promise.then(value => console.log(value));


loadFromStorage("583")
    .catch(retrieveFromAPI)
    .then(logData)
    .then(extractAliases)
    .then(printAliases)
    .catch(reportError)
    .then(printSummary)


    //old way-- pre function 
// fetch("https://anapioficeandfire.com/api/characters/583") //fetch is a function that returns a value, the value is named response and passed to the next function
//     .then(response => response.json()) //.then do another function; functions return a value... we names the returned data and pass to the nect function
//     //this is called chaining; you can do this with methods as well
//     .then(data => console.log(data))



    //If you want to see then entire process with console logs, yes this.

    // fetch("https://anapioficeandfire.com/api/characters/583")
    // .then(response => {
    //   let output = response.json()
    //   console.log("the promise",response)
    //   console.log("the promise object", output);
    //   return output;
    // })
    // .then (data => console.log("fetched data", data))
