const validator = require('./index.js') // підключення нашої бібліотеки

const schema = { // наша схема правил валідації 
    name: { type: "string", min: 5, max: 40, required: true },
    age: { type: "number", min: 14, max: 150 },
    hobbies: { type: "array", min: 1, max: 5 },
    married: { type: "boolean", required: true },
};

const json = { // правильний json об'єкт
    name: "Pringles-Man",
    age: 149,
    hobbies: ["eating", "sleeping", "geeking"],
    married: false,
};

const json1 = { // об'єкт з іменем яке перевищує заданий ліміт
    name: "Pringles-Man-Man-Pringles-Man-Nam-Selgnirp-one-two-three-omg-why-is-it-so-long-i-swear-there-is-already-40-characters-oh-i-forgot-to-create-second-trying",
    age: 149,
    hobbies: ["eating", "sleeping", "geeking"],
    married: false,
};

const json2 = { // об'єкт з перевищеним віком
    name: "Pringles-Man",
    age: 160,
    hobbies: ["eating", "sleeping", "geeking"],
    married: false,
};

const json3 = { // об'єкт з замалим ( пустим ) масивом
    name: "Pringles-Man",
    age: 149,
    hobbies: [],
    married: false,
};

const json4 = { // об'єкт з не тим типом 
    age: 149,
    hobbies: ["eating", "sleeping", "geeking"],
    married: 'yes',
};

function check(json, schema) { // функція для швидкої перевірки об'єктів
    try {
        validator.validateJSON(json, schema);
        console.log("JSON object is valid");
    } catch (error) {
        console.error(`JSON object is invalid: ${error.message}`);
    }
}

check(json, schema)
check(json1, schema)
check(json2, schema)
check(json3, schema)
check(json4, schema)


