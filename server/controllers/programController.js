const Program = require("../models/Program");

const getPrograms = async (req, res, next) => {
  try {
    const programs = await Program.find({
      active: true,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: programs.length,
      data: programs,
    });
  } catch (error) {
    next(error);
  }
};

const getProgramBySlug = async (req, res, next) => {
  try {
    const program = await Program.findOne({
      slug: req.params.slug,
      active: true,
    });

    if (!program) {
      res.status(404);
      throw new Error("Program not found");
    }

    res.json({
      success: true,
      data: program,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProgramsAdmin = async (
  req,
  res,
  next
) => {
  try {
    const programs = await Program.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: programs.length,
      data: programs,
    });
  } catch (error) {
    next(error);
  }
};

const createProgram = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      description,
      category,
      technologies,
      duration,
      active,
    } = req.body;

    if (!title || !slug || !description || !category) {
      res.status(400);
      throw new Error(
        "Title, slug, description and category are required"
      );
    }

    const existing = await Program.findOne({ slug });

    if (existing) {
      res.status(409);
      throw new Error(
        "A program with this slug already exists"
      );
    }

    const program = await Program.create({
      title,
      slug,
      description,
      category,
      technologies,
      duration,
      active,
    });

    res.status(201).json({
      success: true,
      message: "Program created successfully",
      data: program,
    });
  } catch (error) {
    next(error);
  }
};

const updateProgram = async (req, res, next) => {
  try {
    const program = await Program.findById(
      req.params.id
    );

    if (!program) {
      res.status(404);
      throw new Error("Program not found");
    }

    Object.assign(program, req.body);

    const updatedProgram = await program.save();

    res.json({
      success: true,
      message: "Program updated successfully",
      data: updatedProgram,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProgram = async (req, res, next) => {
  try {
    const program = await Program.findById(
      req.params.id
    );

    if (!program) {
      res.status(404);
      throw new Error("Program not found");
    }

    await program.deleteOne();

    res.json({
      success: true,
      message: "Program deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPrograms,
  getProgramBySlug,
  getAllProgramsAdmin,
  createProgram,
  updateProgram,
  deleteProgram,
};