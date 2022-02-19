const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Create User Model
class User extends Model {
    // set up method to run on instance data (per user) to check password 
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

// Define Table Columns and Configuration
User.init(
  {
    // Define an ID Column
    id: {
        // Use the Special Sequelize DataTypes Object Provide Type of Data it is 
        type: DataTypes.INTEGER,
        // Equivalent of SQL "NOT NULL"
        allowNull: false,
        // Instruct that this is the Primary Key
        primaryKey: true,
        // Turn on Auto Increment
        autoIncrement: true
    },
    // Defining a Username Column
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    // Defining Password Column 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // This means the password must be at least four characters long
            len: [4]
        }
    }
  },
  {
    hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
            
        },
        // set up beforeUpdate lifecycle "hook" functionality
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;