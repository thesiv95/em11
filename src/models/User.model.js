import { DataTypes } from 'sequelize';
import sequelize from '../../db.config.js'; 
import { GenderEnum } from '../consts.js';

const User = sequelize.define(
  'user',
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 18,
            max: 80
        }
    },
    gender: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: Object.values(GenderEnum)
    }
  },
);



export default User;