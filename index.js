const mongoose = require("mongoose");

/*------| Config |------*/

const uri = "";
let objectKey = "entry"; // Object key
let keys = ["first", "last", "age", "email"]; // Keys within objectKey

/*----------------------*/

// Initialize Mongoose
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log("MongoDB connection established.")
});

// Import Entry Model
const Entry = require("./Models/Entry.js");

// Handler
exports.handler = async (event) => {

    // Check api call
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

    // Upload to MongoDB
    const newEntry = new Entry({
        first: event.entry.first,
        last: event.entry.last,
        age: parseInt(event.entry.age),
        email: event.entry.email
    });
    // Save
    let instance = await newEntry.save();

    // Return new MongoDB Instance
    return { entry: instance }
}