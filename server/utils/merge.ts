import sequelize from "../db"

export const getAllModels = () => {
    const modelsMap = sequelize.models;
    const models = [];
    for (const key in modelsMap) {
        let value = modelsMap[key];
        models.push(value);
    }
    return models;
}


