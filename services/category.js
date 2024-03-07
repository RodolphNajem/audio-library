const Category = require('../models/category');

async function addCategory(name,description){
    try {
        const category = new Category({name, description});
        return await category.save();

    } catch (error) {
        throw new Error ('Failed to add category:' + error.message);

    }
    
}

module.exports = {addCategory};