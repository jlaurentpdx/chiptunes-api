const pool = require('../utils/pool');

module.exports = class Artist {
  id;
  artist;
  originYear;
  isActive;

  constructor(row) {
    this.id = row.id;
    this.artist = row.artist;
    this.originYear = row.origin_year;
    this.isActive = row.active;
  }

  static async insert({ artist, originYear, isActive }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            artists (artist, origin_year, active)
        VALUES
            ($1, $2, $3)
        RETURNING 
            *
        `,
      [artist, originYear, isActive]
    );

    if (!rows[0]) return null;

    return new Artist(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          artists
        `
    );

    if (!rows) return null;

    return rows.map((row) => new Artist(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          artists
        WHERE
          id=$1
      `,
      [id]
    );

    if (!rows[0]) return null;

    return new Artist(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingArtist = await Artist.findById(id);

    if (!existingArtist) return null;

    const updateEntry = { ...existingArtist, ...attributes };
    const { artist, originYear, isActive } = updateEntry;
    const { rows } = await pool.query(
      `
        UPDATE
          artists
        SET
          artist=$1,
          origin_year=$2,
          active=$3
        WHERE
          id=$4
        RETURNING
          *
      `,
      [artist, originYear, isActive, id]
    );

    if (!rows[0]) return null;

    return new Artist(rows[0]);
  }
};
