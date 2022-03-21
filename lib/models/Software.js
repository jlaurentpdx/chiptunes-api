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

  static async findAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        software
      `
    );

    return rows.map((row) => new Software(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        software
      WHERE
        id=$1
      `,
      [id]
    );

    return new Software(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingSoftware = await Software.findById(id);
    const updateEntry = { ...existingSoftware, ...attributes };

    const { program, recentVersion, type, developer } = updateEntry;

    const { rows } = await pool.query(
      `
      UPDATE
        software
      SET
        program=$1,
        recent_version=$2,
        type=$3,
        developer=$4
      WHERE
        id=$5
      RETURNING
        *
      `,
      [program, recentVersion, type, developer, id]
    );

    return new Software(rows[0]);
  }
};
