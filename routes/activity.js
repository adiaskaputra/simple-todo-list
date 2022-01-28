const router = require('express').Router();
const activityController = require('../src/controllers/activityController');


router.route('/')
  .get(activityController.getAll)
  .post(activityController.create);

router.route('/:id')
  .get(activityController.get)
  .patch(activityController.update)
  .delete(activityController.delete);

module.exports = router;