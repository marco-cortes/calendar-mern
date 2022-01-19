/*
{
    ok:true,
    msg:"obtener eventos",
}
*/
const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {

    const eventos = await Event.find().populate("user", "name");

    res.json({
        ok: true,
        msg: "get events",
        events: eventos,
    });
}

const newEvent = async (req, res = response) => {
    const evento = new Event(req.body);
    try {
        evento.user = req.uid;
        const event = await evento.save();
        res.json({
            ok: true,
            msg: "new event",
            event
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error in server",
        });
    }
}

const updateEvent = async (req, res = response) => {
    const { id } = req.params;
    try {
        const evento = await Event.findById(id);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Event not found",
            });
        }

        if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: "Not authorized",
            });
        }

        await evento.updateOne(req.body);
        
        res.json({
            ok: true,
            msg: "update event",
            id
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error in server",
        });
    }
}

const deleteEvent = async (req, res = response) => {
    const { id } = req.params;
    try {
        const evento = await Event.findById(id);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Event not found",
            });
        }

        if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: "Not authorized",
            });
        }

        await evento.deleteOne();
        
        res.json({
            ok: true,
            msg: "Delete event",
            id
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error in server",
        });
    }
}

module.exports = {
    getEvents,
    newEvent,
    updateEvent,
    deleteEvent
}

