"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true, // null if login via Google/Facebook
      },
      provider: {
        type: Sequelize.ENUM("local", "google", "facebook"),
        allowNull: false,
        defaultValue: "local",
      },
      provider_id: {
        type: Sequelize.STRING,
        allowNull: true, // external provider user id
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive", "hold"),
        allowNull: false,
        defaultValue: "active",
      },
      avatar_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM("user", "admin", "editor"),
        allowNull: false,
        defaultValue: "user",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // Start IDs from 1001
    await queryInterface.sequelize.query(
      "ALTER SEQUENCE users_id_seq RESTART WITH 1001;"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_provider";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_status";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_role";'
    );
  },
};
