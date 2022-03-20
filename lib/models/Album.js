const pool = require('../utils/pool');

module.exports = class Album {
  id;
  title;
  artist;
  released;
  price;
  source;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.artist = row.artist;
    this.released = row.released;
    this.price = row.price;
    this.source = row.source;
  }

  static async insert({ title, artist, released, price, source }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        albums (title, artist, released, price, source)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING 
        *
      `,
      [title, artist, released, price, source]
    );

    if (!rows[0]) return null;

    return new Album(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        albums
      `
    );

    if (!rows) return null;

    return rows.map((row) => new Album(row));
  }
};
