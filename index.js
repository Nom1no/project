function validateJSON(json, schema) { // наша головна функція. Тут цикл проходить по схемі і самому JSON об'єкту. На кожен цикл йде звірка за допомогою нижчих функцій.  
    for (let key in schema) {
        const type = schema[key].type;
        const value = json[key];
        if (value === undefined && !schema[key].required) {
            continue;
        }
        switch (type) {
            case "number":
                validateNumber(key, value, schema[key]);
                break;
            case "string":
                validateString(key, value, schema[key]);
                break;
            case "boolean":
                validateBoolean(key, value, schema[key]);
                break;
            case "array":
                validateArray(key, value, schema[key]);
                break;
            default:
                throw new Error(`Invalid schema type: ${type}`);
        }
    }
}

function validateNumber(key, value, schema) { // Валідація number з min і max
    if (typeof value !== "number") {
        throw new Error(`'${key}' is not a number`);
    }
    if (schema.min !== undefined && value < schema.min) {
        throw new Error(`'${key}' is less than the minimum (${schema.min})`);
    }
    if (schema.max !== undefined && value > schema.max) {
        throw new Error(`'${key}' is greater than the maximum (${schema.max})`);
    }
}

function validateString(key, value, schema) { // валідація string з min і max
    if (typeof value !== "string") {
        throw new Error(`'${key}' is not a string`);
    }
    if (schema.min !== undefined && value.length < schema.min) {
        throw new Error(`'${key}' is less than it's minimum length (${schema.min})`);
    }
    if (schema.max !== undefined && value.length > schema.max) {
        throw new Error(`'${key}' is greater than it's maximum length (${schema.max})`);
    }
}

function validateBoolean(key, value, schema) { // валідація boolean. тут просто якщо тип не boolean то помилка
    if (typeof value !== "boolean") {
        throw new Error(`'${key}' is not a boolean`);
    }
}

function validateArray(key, value, schema) { // валідація масива з min і max
    if (!Array.isArray(value)) {
        throw new Error(`'${key}' is not an array`);
    }
    if (schema.min !== undefined && value.length < schema.min) {
        throw new Error(`'${key}' is less than it's minimum size (${schema.min})`);
    }
    if (schema.max !== undefined && value.length > schema.max) {
        throw new Error(`'${key}' is greater than it's maximum size (${schema.max})`);
    }
}

module.exports = { // експорт бібліотеки
    validateJSON,
    validateNumber,
    validateString,
    validateArray,
    validateBoolean
}