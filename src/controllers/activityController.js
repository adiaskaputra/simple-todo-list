const Op = require('sequelize').Op;
const serviceCrud = require('../services/crud');
const { successResponse, warningResponse, errorResponse, paginationResponse } = require('../../helpers/response');
const Activity = require('../../models').activities;
const Todo = require('../../models').todos;


exports.getAll = async (req, res) => {
    try {
        const param = {
            per_page: +req.query.per_page || 1000,
            page: +req.query.page || 1,
            email: req.query.email || null
        }

        const query = {
            attributes: { exclude: ['email'] }
        };
        if (param.email) {
            query.where = { email: param.email }
        }

        const count = await serviceCrud.count(Activity, query);
        query.limit = param.per_page;
        query.offset = param.per_page * (param.page - 1);
        query.order = param.sort;
        const rows = await serviceCrud.findAll(Activity, query)

        paginationResponse(res, count, param, rows)
    }
    catch (err) {
        errorResponse(res, err)
    }
}

exports.get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await serviceCrud.findOne(Activity, {
            where: {
                id: id
            },
            include: [
                {
                    model: Todo,
                }
            ]
        });
        if (!data) return warningResponse(res, id)
        res.status(200).json(data)
    }
    catch (err) {
        errorResponse(res, err)
    }
}

exports.create = async (req, res) => {
    try {
        const { title, email } = req.body;
        const data = await serviceCrud.create(Activity, { title, email });
        res.status(201).json(data)
    }
    catch (err) {
        if (!req.body.title) {
            return res.status(400).json(err)
        }
        errorResponse(res, err)
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { title } = req.body;

        const data = await serviceCrud.findOne(Activity, {
            where: { id }
        });
        if (!data) return warningResponse(res, id)

        await serviceCrud.update(Activity, { title }, {
            where: { id }
        });

        res.status(200).json(data)
    }
    catch (err) {
        if (!req.body.title) {
            res.status(400).json(err)
        }
        errorResponse(res, err)
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await serviceCrud.findOne(Activity, {
            where: { id }
        });
        if (!data) return warningResponse(res, id)

        await serviceCrud.delete(Activity, {
            where: { id }
        })
        successResponse(res, { message: 'data removed' })
    }
    catch (err) {
        errorResponse(res, err)
    }
}