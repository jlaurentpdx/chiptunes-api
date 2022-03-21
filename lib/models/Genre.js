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

    if (!rows[0]) return null;

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

    if (!rows) return null;

    return rows.map((row) => new Genre(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        genres
      WHERE
        id=$1
      `,
      [id]
    );

    if (!rows[0]) return null;

    return new Genre(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingGenre = await Genre.findById(1);

    const updateEntry = { ...existingGenre, ...attributes };
    const { genre, description, artists } = updateEntry;

    const { rows } = await pool.query(
      `
      UPDATE
        genres
      SET
        genre=$1,
        description=$2,
        artists=$3
      WHERE
        id=$4
      RETURNING
        *
      `,
      [genre, description, artists, id]
    );

    if (!rows[0]) return null;

    return new Genre(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        genres
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    if (!rows[0]) return null;

    return new Genre(rows[0]);
  }
};
