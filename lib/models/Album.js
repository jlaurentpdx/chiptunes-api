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

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        albums
      WHERE
        id=$1
      `,
      [id]
    );

    return new Album(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingAlbum = await Album.findById(id);

    if (!existingAlbum) return null;

    const updateEntry = { ...existingAlbum, ...attributes };
    const { title, artist, released, price, source } = updateEntry;
    const { rows } = await pool.query(
      `
      UPDATE
        albums
      SET
        title=$1,
        artist=$2,
        released=$3,
        price=$4,
        source=$5
      WHERE
        id=$6
      RETURNING
        *
      `,
      [title, artist, released, price, source, id]
    );

    if (!rows[0]) return null;

    return new Album(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        albums
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    if (!rows[0]) return null;

    return new Album(rows[0]);
  }
};
