require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");

const Service = require("../models/Service");
const Program = require("../models/Program");
const FAQ = require("../models/FAQ");

const services = [
  {
    title: "Web Development",
    slug: "web-development",
    description:
      "Modern responsive web experiences designed around usability, performance and maintainable development practices.",
    category: "DIGITAL SERVICES",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    featured: true,
    active: true,
  },
  {
    title: "Digital Solutions",
    slug: "digital-solutions",
    description:
      "Technology-oriented solutions designed to support digital requirements and business workflows.",
    category: "DIGITAL SERVICES",
    technologies: ["JavaScript", "Node.js", "MongoDB"],
    featured: true,
    active: true,
  },
  {
    title: "Technology Services",
    slug: "technology-services",
    description:
      "Technology services presented through a structured and professional digital experience.",
    category: "TECHNOLOGY",
    technologies: ["Web Technologies"],
    featured: false,
    active: true,
  },
];

const programs = [
  {
    title: "Web Development",
    slug: "web-development",
    description:
      "A structured learning path focused on modern web development concepts and practical implementation.",
    category: "TECHNOLOGY PROGRAM",
    technologies: ["HTML", "CSS", "JavaScript"],
    duration: "",
    active: true,
  },
  {
    title: "Full Stack Development",
    slug: "full-stack-development",
    description:
      "A development-oriented program covering frontend, backend and database concepts.",
    category: "TECHNOLOGY PROGRAM",
    technologies: ["React", "Node.js", "MongoDB"],
    duration: "",
    active: true,
  },
  {
    title: "Programming & Development",
    slug: "programming-development",
    description:
      "A practical technology learning path focused on programming fundamentals and application development.",
    category: "TECHNOLOGY PROGRAM",
    technologies: ["Programming", "Web Development"],
    duration: "",
    active: true,
  },
];

const faqs = [
  {
    question: "What does Veda Technology offer?",
    answer:
      "The platform presents technology programs, training opportunities and IT or digital service information.",
    order: 1,
    active: true,
  },
  {
    question: "How can I learn more about the available programs?",
    answer:
      "You can explore the Programs section or contact Veda Technology for current program information.",
    order: 2,
    active: true,
  },
  {
    question:
      "Does Veda Technology provide internship or training opportunities?",
    answer:
      "Internship and training information is presented through the dedicated Internship & Training section.",
    order: 3,
    active: true,
  },
  {
    question: "How can I contact Veda Technology?",
    answer:
      "Use the Contact section to submit an inquiry or access the available contact information.",
    order: 4,
    active: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Service.deleteMany({});
    await Program.deleteMany({});
    await FAQ.deleteMany({});

    await Service.insertMany(services);
    await Program.insertMany(programs);
    await FAQ.insertMany(faqs);

    console.log("Database seeded successfully.");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();