import db from "#db/client";

await db.connect();
await seed();
await db.end();

async function seed() {
  const {
    rows: [documents],
  } = await db.query(`
    INSERT INTO folders (name)
    VALUES ('Documents')
    RETURNING *;
  `);

  const {
    rows: [photos],
  } = await db.query(`
    INSERT INTO folders (name)
    VALUES ('Photos')
    RETURNING *;
  `);

  const {
    rows: [music],
  } = await db.query(`
    INSERT INTO folders (name)
    VALUES ('Music')
    RETURNING *;
  `);

  await db.query(
    `
      INSERT INTO files (name, size, folder_id)
      VALUES
        ('resume.pdf', 250, $1),
        ('homework.txt', 120, $1),
        ('notes.docx', 340, $1),
        ('report.pdf', 500, $1),
        ('schedule.xlsx', 180, $1);
    `,
    [documents.id],
  );

  await db.query(
    `
      INSERT INTO files (name, size, folder_id)
      VALUES
        ('vacation.jpg', 1200, $1),
        ('family.png', 950, $1),
        ('profile.jpg', 700, $1),
        ('sunset.jpg', 1100, $1),
        ('birthday.png', 850, $1);
    `,
    [photos.id],
  );

  await db.query(
    `
      INSERT INTO files (name, size, folder_id)
      VALUES
        ('song-one.mp3', 4000, $1),
        ('song-two.mp3', 4200, $1),
        ('song-three.mp3', 3800, $1),
        ('song-four.mp3', 4500, $1),
        ('song-five.mp3', 4100, $1);
    `,
    [music.id],
  );

  console.log("Database seeded successfully.");
}