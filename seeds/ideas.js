exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("ideas")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("ideas").insert([
        { creator: "Ali", idea: "A To Do List app!" },
        { creator: "Ali", idea: "A Blog!" }
      ]);
    });
};
