module.exports = (sequelize, DataTypes) => {

    const Movies = (sequelize.define('movie', {

        title: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        runtime: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(2000),
            allowNull: false
        },
        actors: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ownerid: {
            type: DataTypes.INTEGER,
            // allowNull: false
        },
    }))
    return Movies;
};