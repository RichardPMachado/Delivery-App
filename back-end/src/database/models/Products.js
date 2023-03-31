module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
  'Product', 
  {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      
      price: { type: DataTypes.DECIMAL(4,2), allowNull: false }, 
      urlImage: { type: DataTypes.STRING, allowNull: false },
    },
  {
      timestamps: false,
      underscored: true,
      force:true,
    },
  );
  
    return Product;
  };