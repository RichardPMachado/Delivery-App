module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales_products", {
      saleId: {
        allowNull: false,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'sale_id',
        type: Sequelize.INTEGER,
        references: {
          model: 'sales',
          key: 'id',
        }
      },
      productId: {
        allowNull: false,
        primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'product_id',
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        }
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("sales_products");
  }
};