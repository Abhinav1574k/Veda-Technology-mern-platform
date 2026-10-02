import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";

const initialForm = {
  title: "",
  slug: "",
  description: "",
  category: "",
  technologies: "",
  featured: false,
  active: true,
};

const ServicesAdmin = () => {
  const [services, setServices] = useState([]);

  const [form, setForm] =
    useState(initialForm);

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const response =
        await api.get(
          "/services/admin/all"
        );

      setServices(
  response.data.data || []
);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to load services"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...form,

        technologies: form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (editingId) {
        await api.put(
          `/services/${editingId}`,
          payload
        );

        toast.success(
          "Service updated successfully"
        );
      } else {
        await api.post(
          "/services",
          payload
        );

        toast.success(
          "Service created successfully"
        );
      }

      resetForm();

      await fetchServices();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to save service"
      );
    } finally {
      setSaving(false);
    }
  };

  const editService = (service) => {
    setEditingId(service._id);

    setForm({
      title: service.title || "",
      slug: service.slug || "",
      description:
        service.description || "",
      category:
        service.category || "",
      technologies:
        service.technologies?.join(
          ", "
        ) || "",
      featured:
        Boolean(service.featured),
      active:
        Boolean(service.active),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteService = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this service?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(
        `/services/${id}`
      );

      toast.success(
        "Service deleted successfully"
      );

      setServices((current) =>
        current.filter(
          (service) =>
            service._id !== id
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete service"
      );
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner" />

        <p>
          Loading services...
        </p>
      </div>
    );
  }

  return (
    <section className="admin-page">

      <div className="admin-page-header">

        <div>
          <h1>
            Services
          </h1>

          <p>
            Manage services displayed
            on the website.
          </p>
        </div>

      </div>

      <div className="admin-card">

        <div className="admin-card-header">

          <h2>
            {editingId
              ? "Edit Service"
              : "Create Service"}
          </h2>

        </div>

        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >

          <div className="form-grid">

            <div className="form-group">
              <label>
                Title
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Slug
              </label>

              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="web-development"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Category
              </label>

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Technologies
              </label>

              <input
                name="technologies"
                value={
                  form.technologies
                }
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

          </div>

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={
                form.description
              }
              onChange={handleChange}
              rows="5"
              required
            />

          </div>

          <div className="checkbox-row">

            <label>
              <input
                type="checkbox"
                name="featured"
                checked={
                  form.featured
                }
                onChange={
                  handleChange
                }
              />

              Featured
            </label>

            <label>
              <input
                type="checkbox"
                name="active"
                checked={
                  form.active
                }
                onChange={
                  handleChange
                }
              />

              Active
            </label>

          </div>

          <div className="form-actions">

            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Service"
                : "Create Service"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

      <div className="admin-card">

        <div className="admin-card-header">

          <h2>
            Existing Services
          </h2>

        </div>

        {services.length === 0 ? (

          <div className="empty-state">
            <h3>
              No services yet
            </h3>

            <p>
              Create your first service
              above.
            </p>
          </div>

        ) : (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>
                    Title
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Featured
                  </th>

                  <th>
                    Active
                  </th>

                  <th>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {services.map(
                  (service) => (
                    <tr
                      key={
                        service._id
                      }
                    >

                      <td>
                        {service.title}
                      </td>

                      <td>
                        {service.category}
                      </td>

                      <td>
                        {service.featured
                          ? "Yes"
                          : "No"}
                      </td>

                      <td>
                        {service.active
                          ? "Yes"
                          : "No"}
                      </td>

                      <td>

                        <div className="table-actions">

                          <button
                            type="button"
                            onClick={() =>
                              editService(
                                service
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="danger-button"
                            onClick={() =>
                              deleteService(
                                service._id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </section>
  );
};

export default ServicesAdmin;