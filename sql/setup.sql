-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS artists, albums, genres, hardware, software;

CREATE TABLE artists (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    artist TEXT NOT NULL,
    name TEXT,
    origin_year INT NOT NULL,
    active BOOLEAN NOT NULL
);

INSERT INTO artists (artist, name, origin_year, active)
VALUES 
    ('Chip Tanaka', 'Hirokazu Tanaka', 1980, TRUE),
    ('Pixelh8', 'Matthew Applegate', 1999, TRUE);

CREATE TABLE albums (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    artist INT NOT NULL,
    released INT NOT NULL,
    price REAL,
    source TEXT,
    CONSTRAINT artist
        FOREIGN KEY(artist) 
            REFERENCES artists(id)
);

INSERT INTO albums(title, artist, released, price, source)
VALUES 
    ('Domani', 1, 2021, 13.29, 'Bandcamp'),
    ('Domingo', 1, 2020, 11.74, 'Bandcamp'),
    ('Django', 1, 2017, 11.74, 'Bandcamp'),
    ('Observations', 2, 2010, null, null),
    ('And The Revolution', 2, 2009, null, null),
    ('Obsolete?', 2, 2009, null, null),
    ('The Boy With The Digital Heart', 2, 2007, null, null),
    ('Videogames Ruined My Life', 2, 2007, null, null);


CREATE TABLE genres (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    genre TEXT NOT NULL,
    description TEXT NOT NULL,
    artists TEXT []
);

INSERT INTO genres(genre, description, artists)
VALUES 
    ('Chiptunes', 'A broad class of music made with PSGs or their emulations, often in the form of 8-bit sonic wizardry.', ARRAY['Chip Tanaka', 'Pixelh8']), 
    ('Bitpop', 'Subgenre of chiptunes that features a mix of equipment old and new, blending PSGs with live synths and other instrumentation.', ARRAY['Chipzel', 'Welle:Erdball']), 
    ('Nintendocore', 'Where post-hardcore meets chiptunes. Nintendocore mixes PSG sounds and samples with rock and metal instruments and influence.', ARRAY['Horse the Band', 'The Deprecation Guild']);

CREATE TABLE hardware (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    device TEXT NOT NULL,
    type TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    chip TEXT NOT NULL,
    channels INT
);

INSERT INTO hardware(device, type, manufacturer, chip, channels)
VALUES
    ('Game Boy (original)', 'Console', 'Nintendo', 'GB-Z80', 4),
    ('Commodore 64', 'Home computer', 'Commodore International', 'SID 6581/8580', 3);

CREATE TABLE software (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    program TEXT NOT NULL,
    recent_version TEXT NOT NULL,
    type TEXT NOT NULL,
    developer TEXT NOT NULL
);

INSERT INTO software(program, recent_version, type, developer)
VALUES
    ('LittleSoundDJ (LSDJ)', 'v9.2.6', 'Sequencer', 'Johan Kotlinski'),
    ('FamiTracker', 'v0.4.6', 'Tracker', 'jsr');

