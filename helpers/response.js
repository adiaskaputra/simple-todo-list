exports.successResponse = (res, e) => {
    const statusCode = e.statusCode || 200
    const data = e.data || {}
    res.status(statusCode).json({ data })
}

exports.warningResponse = (res, id) => {
    res.status(404).json({
        "name": "NotFound",
        "message": `No record found for id '${id}'`,
        "code": 404,
        "className": "not-found",
        "errors": {}
    })
}

exports.errorResponse = (res, err) => {
    res.status(500).json({ status: 'Internal Server Error', message: err.message })
}

exports.paginationResponse = (res, count, { per_page, page }, rows) => {
    res.status(200).json({
        total: count,
        limit: per_page,
        skip: per_page * (page - 1),
        data: rows
    })
}