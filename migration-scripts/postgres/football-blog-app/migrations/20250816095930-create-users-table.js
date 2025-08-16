"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true, // null if login via Google/GitHub
      },
      provider: {
        type: Sequelize.ENUM("local", "google", "facebook"),
        allowNull: false,
        defaultValue: "local",
      },
      provider_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      logged_in: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");

    // Cleanup ENUM types
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
