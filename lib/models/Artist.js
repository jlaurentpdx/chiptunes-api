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
};
