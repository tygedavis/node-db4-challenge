
exports.up = function(knex) {
  return knex.schema.createTable('recipes', tbl => {
    tbl.increments();
    tbl.text('name', 30).notNullable();
  })
  .createTable('ingredients', tbl => {
    tbl.increments();
    tbl.text('name', 30).notNullable();
  })
  .createTable('ingredients_recipes', tbl => {
    tbl.increments();
    tbl.text('quantity', 10).notNullable();
    tbl.integer('recipe_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('recipes')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl.integer('ingredient_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('ingredients')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
  })
  .createTable('instructions', tbl => {
    tbl.increments();
    tbl.text('direction').notNullable();
    tbl.integer('recipe_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('recipes')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('instructions')
    .dropTableIfExists('ingredients_recipes')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes');
};
