const Op = require('sequelize').Op;
const serviceCrud = require('../services/crud');
const { successResponse, warningResponse, errorResponse, paginationResponse } = require('../../helpers/response');
const Todo = require('../../models').todos;

exports.getAll = async (req, res) => {
    try {
        const param = {
            per_page: +req.query.per_page || 10,
            page: +req.query.page || 1,
            activity_group_id: req.query.activity_group_id || null
        }

        const query = {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        };
        const count = await serviceCrud.count(Todo, query);
        query.limit = param.per_page;
        query.offset = param.per_page * (param.page - 1);
        query.order = param.sort;
        const rows = await serviceCrud.findAll(Todo, query)

        paginationResponse(res, count, param, rows)
    }
    catch (err) {
        errorResponse(res, err)
    }
}

exports.get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await serviceCrud.findOne(Todo, {
            where: { id }
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
        const { activity_group_id, title, priority, is_active } = req.body;
        const data = await serviceCrud.create(Todo, { activity_group_id, title, priority, is_active });
        res.status(201).json(data)
    }
    catch (err) {
        if (!req.body.title || !req.body.activity_group_id) {
            return res.status(400).json(err)
        }
        errorResponse(res, err)
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, priority, is_active } = req.body;

        const data = await serviceCrud.findOne(Todo, {
            where: { id }
        });
        if (!data) return warningResponse(res, id)

        await serviceCrud.update(Todo, { title, priority, is_active }, {
            where: { id }
        });

        res.status(200).json(data)
    }
    catch (err) {
        errorResponse(res, err)
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await serviceCrud.findOne(Todo, {
            where: { id }
        });
        if (!data) return warningResponse(res, id)

        await serviceCrud.delete(Todo, {
            where: { id }
        })
        successResponse(res, { message: 'data removed' })
    }
    catch (err) {
        errorResponse(res, err)
    }
}

