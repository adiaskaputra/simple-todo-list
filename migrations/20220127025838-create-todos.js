'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activity_group_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'activities',
          key: 'id'
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
      },
      priority: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
        validate: {
          min: 1,
          max: 5
        }
      },
      createdAt: { type: Sequelize.DATE, field: 'created_at' },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todos');
  }
};