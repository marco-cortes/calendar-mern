const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

EventSchema.methods.toJSON = function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
}

module.exports = model("Event", EventSchema);
