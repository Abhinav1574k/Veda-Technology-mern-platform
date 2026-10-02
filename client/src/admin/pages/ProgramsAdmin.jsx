import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";

const initialForm = {
  title: "",
  slug: "",
  description: "",
  category: "",
  technologies: "",
  duration: "",
  active: true,
};

const ProgramsAdmin = () => {
  const [programs, setPrograms] =
    useState([]);

  const [form, setForm] =
    useState(initialForm);

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const fetchPrograms = async () => {
    try {
      setLoading(true);

      const response =
        await api.get(
          "/programs/admin/all"
        );

     setPrograms(
  response.data.data || []
);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to load programs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
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
          `/programs/${editingId}`,
          payload
        );

        toast.success(
          "Program updated successfully"
        );
      } else {
        await api.post(
          "/programs",
          payload
        );

        toast.success(
          "Program created successfully"
        );
      }

      resetForm();

      await fetchPrograms();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to save program"
      );
    } finally {
      setSaving(false);
    }
  };

  const editProgram = (program) => {
    setEditingId(program._id);

    setForm({
      title: program.title || "",
      slug: program.slug || "",
      description:
        program.description || "",
      category:
        program.category || "",
      technologies:
        program.technologies?.join(
          ", "
        ) || "",
      duration:
        program.duration || "",
      active:
        Boolean(program.active),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteProgram = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this program?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(
        `/programs/${id}`
      );

      setPrograms((current) =>
        current.filter(
          (program) =>
            program._id !== id
        )
      );

      toast.success(
        "Program deleted successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete program"
      );
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner" />

        <p>
          Loading programs...
        </p>
      </div>
    );
  }

  return (
    <section className="admin-page">

      <div className="admin-page-header">
        <div>
          <h1>
            Programs
          </h1>

          <p>
            Manage programs displayed
            on the website.
          </p>
        </div>
      </div>

      <div className="admin-card">

        <div className="admin-card-header">

          <h2>
            {editingId
              ? "Edit Program"
              : "Create Program"}
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
                placeholder="full-stack-development"
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
                Duration
              </label>

              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="8 weeks"
              />
            </div>

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
                ? "Update Program"
                : "Create Program"}
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
            Existing Programs
          </h2>
        </div>

        {programs.length === 0 ? (

          <div className="empty-state">

            <h3>
              No programs yet
            </h3>

            <p>
              Create your first program
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
                    Duration
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

                {programs.map(
                  (program) => (
                    <tr
                      key={
                        program._id
                      }
                    >

                      <td>
                        {program.title}
                      </td>

                      <td>
                        {program.category}
                      </td>

                      <td>
                        {program.duration ||
                          "—"}
                      </td>

                      <td>
                        {program.active
                          ? "Yes"
                          : "No"}
                      </td>

                      <td>

                        <div className="table-actions">

                          <button
                            type="button"
                            onClick={() =>
                              editProgram(
                                program
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="danger-button"
                            onClick={() =>
                              deleteProgram(
                                program._id
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

export default ProgramsAdmin;