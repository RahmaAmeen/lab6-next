// Seed script for the Tutorial 6 demo: `npm run seed`
// Creates 2 courses, 1 student and 1 admin (bcrypt-hashed passwords).
// Safe to run again: it removes its own records first.
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGO_URI = 'mongodb://localhost:27017/nestStudent'; // same as app.module.ts

// Same model names as the Nest app ('course' -> courses, 'student' -> students)
const Course = mongoose.model(
  'course',
  new mongoose.Schema({ id: String, name: String }),
);
const Student = mongoose.model(
  'student',
  new mongoose.Schema({
    email: String,
    role: String,
    name: String,
    password: String,
    age: Number,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }],
  }),
);

const COURSES = [
  { id: 'SE101', name: 'Software Project I' },
  { id: 'WEB201', name: 'Web Development' },
];

const USERS = [
  { email: 'student@uni.edu', password: 'student123', name: 'Sara Student', age: 21, role: 'student' },
  { email: 'admin@uni.edu', password: 'admin123', name: 'Adam Admin', age: 35, role: 'admin' },
];

async function main() {
  await mongoose.connect(MONGO_URI);

  await Course.deleteMany({ id: { $in: COURSES.map((c) => c.id) } });
  await Student.deleteMany({ email: { $in: USERS.map((u) => u.email) } });

  const courses = await Course.insertMany(COURSES);

  for (const u of USERS) {
    await Student.create({
      ...u,
      password: await bcrypt.hash(u.password, 10),
      // the student is enrolled in both courses; the admin in none
      courses: u.role === 'student' ? courses.map((c) => c._id) : [],
    });
  }

  console.log('Seeded:');
  courses.forEach((c) => console.log(`  course  ${c.id}  ${c.name}  (_id ${c._id})`));
  USERS.forEach((u) => console.log(`  ${u.role.padEnd(7)} ${u.email} / ${u.password}`));
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
