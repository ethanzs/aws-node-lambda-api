const mongoose = require("mongoose");
const uri = "";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log("MongoDB connection established.")
});

const Entry = require("./Models/Entry.js");

exports.handler = async (event) => {

    // Check api call
    let objectKey = "entry"; // Object key
    let keys = ["first", "last", "age", "email"]; // Keys within objectKey

    if (event.hasOwnProperty(objectKey)) // If there is no entry object
    {
        if (Object.keys(event.entry).length == 4) // If the entry object does not consist of 4 key->val pairs
        {
            for (let i = 0; i < keys.length; i++) {
                if (!event.entry.hasOwnProperty(keys[i])) // If required entry key is missing
                {
                    return { ERROR: "Invalid API call format. A required key is missing." }
                }
            }
        }
        else {
            return { ERROR: "Invalid API call format. Entry does not consist of the right amount of key->val pairs ('first', 'last', 'age', 'email')." }
        }
    }
    else {
        return { ERROR: "Invalid API call format. Entry is missing." }
    }

    // no u dont

    // Upload to MongoDB
    const newEntry = new Entry({
        first: event.entry.first,
        last: event.entry.last,
        age: parseInt(event.entry.age),
        email: event.entry.email
    });
    // Save
    let instance = await newEntry.save();

    return { entry: instance }
}