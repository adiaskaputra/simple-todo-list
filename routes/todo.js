const router = require('express').Router();
const todoController = require('../src/controllers/todoController');


router.route('/')
  .get(todoController.getAll)
  .post(todoController.create);

router.route('/:id')
  .get(todoController.get)
  .patch(todoController.update)
  .delete(todoController.delete);

module.exports = router;