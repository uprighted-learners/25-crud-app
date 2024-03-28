let customObj = {
    name: "Chris"
}

console.log("Original custom object: ", customObj)

let jsonString = JSON.stringify(customObj)

console.log("JSON string: ", jsonString)

let parsedObj = JSON.parse(jsonString)

console.log("Parsed object: ", parsedObj)