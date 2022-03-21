const pool = require('../utils/pool');

module.exports = class Genre {
  id;
  genre;
  description;
  artists;

  constructor(row) {
    this.id = row.id;
    this.genre = row.genre;
    this.description = row.description;
    this.artists = row.artists;
  }

  static async insert({ genre, description, artists }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          genres (genre, description, artists)
        VALUES
          ($1, $2, $3)
        RETURNING
          *
        `,
      [genre, description, artists]
    );

    return new Genre(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      genres
    `
    );

    return rows.map((row) => new Genre(row));
  }
};