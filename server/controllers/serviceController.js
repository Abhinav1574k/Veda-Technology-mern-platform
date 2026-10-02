const Service = require("../models/Service");

const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({
      active: true,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug,
      active: true,
    });

    if (!service) {
      res.status(404);
      throw new Error("Service not found");
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

const getAllServicesAdmin = async (
  req,
  res,
  next
) => {
  try {
    const services = await Service.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

const createService = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      description,
      category,
      technologies,
      featured,
      active,
    } = req.body;

    if (!title || !slug || !description || !category) {
      res.status(400);
      throw new Error(
        "Title, slug, description and category are required"
      );
    }

    const existing = await Service.findOne({ slug });

    if (existing) {
      res.status(409);
      throw new Error(
        "A service with this slug already exists"
      );
    }

    const service = await Service.create({
      title,
      slug,
      description,
      category,
      technologies,
      featured,
      active,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(
      req.params.id
    );

    if (!service) {
      res.status(404);
      throw new Error("Service not found");
    }

    Object.assign(service, req.body);

    const updatedService = await service.save();

    res.json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(
      req.params.id
    );

    if (!service) {
      res.status(404);
      throw new Error("Service not found");
    }

    await service.deleteOne();

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  getServiceBySlug,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
};