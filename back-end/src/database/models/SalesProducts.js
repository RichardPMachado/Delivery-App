module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define(
    'SalesProduct',
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      tableName: 'sales_products',
      timestamps: false,
      underscored: true,
    },
  );  SalesProducts.associate = (models) => {
    models.Sale.belongsToMany(
      models.Product, 
      {
        as: 'products',
        through: SalesProducts,
        foreignKey: 'saleId',
        otherKey: 'productId',
      },
    );    models.Product.belongsToMany(
      models.Sale,
      {
        as: 'sales',
        through: SalesProducts,
        foreignKey: 'productId',
        otherKey: 'saleId',
      },
    );
  };  return SalesProducts;
};
