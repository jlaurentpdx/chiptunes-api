const pool = require('../utils/pool');

module.exports = class Software {
  id;
  program;
  recentVersion;
  type;
  developer;

  constructor(row) {
    this.id = row.id;
    this.program = row.program;
    this.recentVersion = row.recent_version;
    this.type = row.type;
    this.developer = row.developer;
  }

  static async insert({ program, recentVersion, type, developer }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        software (program, recent_version, type, developer)
      VALUES
        ($1, $2, $3, $4)
      RETURNING 
        *
      `,
      [program, recentVersion, type, developer]
    );

    return new Software(rows[0]);
  }
};
