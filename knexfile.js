module.exports = {
  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:"
    },
    useNullAsDefault: true
  },

  development: {
    client: "pg",
    connection: "postgres://postgres:password@localhost:5432/ideas_app"
  }
};
