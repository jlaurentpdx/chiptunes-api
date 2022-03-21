const pool = require('../utils/pool');

module.exports = class Hardware {
  id;
  device;
  type;
  manufacturer;
  chip;
  channels;

  constructor(row) {
    this.id = row.id;
    this.device = row.device;
    this.type = row.type;
    this.manufacturer = row.manufacturer;
    this.chip = row.chip;
    this.channels = row.channels;
  }

  static async insert({ device, type, manufacturer, chip, channels }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        hardware (device, type, manufacturer, chip, channels)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING 
        *
      `,
      [device, type, manufacturer, chip, channels]
    );

    return new Hardware(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      hardware
    `
    );

    return rows.map((row) => new Hardware(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        hardware
      WHERE
        id=$1
      `,
      [id]
    );

    return new Hardware(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingHardware = await Hardware.findById(1);
    const updateEntry = { ...existingHardware, ...attributes };
    const { device, type, manufacturer, chip, channels } = updateEntry;

    const { rows } = await pool.query(
      `
      UPDATE
        hardware
      SET
        device=$1,
        type=$2,
        manufacturer=$3,
        chip=$4,
        channels=$5
      WHERE
        id=$6
      RETURNING
        *
      `,
      [device, type, manufacturer, chip, channels, id]
    );

    return new Hardware(rows[0]);
  }
};
