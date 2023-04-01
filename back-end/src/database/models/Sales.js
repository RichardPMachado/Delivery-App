module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      sellerId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      status: DataTypes.STRING,
    },
    {
      tableName: 'sales',
      timestamps: false,
      underscored: true,
    },
  );  
  
  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });

    Sale.belongsTo(models.User,
      { foreignKey: 'id', as: 'seller' });

    Sale.hasMany(models.SalesProduct, 
      { foreignKey: 'saleId', as: 'sale' });
  };
  return Sale;
};