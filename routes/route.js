const express = require("express");
const router = express.Router();

const Contact = require('../models/contacts');

router.get('/contacts', (req, res, next) => {
    Contact.find(function (err, contacts) {
        res.json(contacts);
    })
});

router.post('/contact', (req, res, next) => {
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });
    newContact.save((err, contact) => {
        if (err) {
            res.json({ msg: 'Failed to add contact' });
        }
        else {
            res.json({ msg: 'contact added successfully' });
        }
    });
});

router.delete('/contact/:id', (req, res, next) => {
    Contact.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    })
});

router.put('/contact/:id', function (req, res) {
    Contact.findById(req.params.id, function (err, contact) {
        if (err)
            res.send(err);
        contact.first_name = req.body.first_name;
        contact.last_name = req.body.last_name;
        contact.phone = req.body.phone;

        contact.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Contact updated!' });
        });
    });
});

module.exports = router;