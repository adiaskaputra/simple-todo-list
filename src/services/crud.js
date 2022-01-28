const Promise = require('promise');

exports.count = (model, query) => {
    return new Promise((resolve, reject) => {
        model.count(query)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
};

exports.findAll = (model, query) => {
    return new Promise((resolve, reject) => {
        model.findAll(query)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
};

exports.findOne = (model, query) => {
    return new Promise((resolve, reject) => {
        model.findOne(query)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
};

exports.create = (model, query) => {
    return new Promise((resolve, reject) => {
        model.create(query)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
};

exports.bulkCreate = (model, payload) => {
    return new Promise((resolve, reject) => {
        model.bulkCreate(payload)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
};

exports.update = (model, payload, query) => {
    return new Promise((resolve, reject) => {
        model.update(payload, query)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
};

exports.delete = (model, query) => {
    return new Promise((resolve, reject) => {
        model.destroy(query)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
};