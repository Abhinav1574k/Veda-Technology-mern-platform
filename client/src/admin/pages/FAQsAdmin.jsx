import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";

const initialForm = {
  question: "",
  answer: "",
  order: 0,
  active: true,
};

const FAQsAdmin = () => {
  const [faqs, setFaqs] =
    useState([]);

  const [form, setForm] =
    useState(initialForm);

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const fetchFAQs = async () => {
    try {
      setLoading(true);

      const response =
        await api.get(
          "/faqs/admin/all"
        );

      setFaqs(
  response.data.data || []
);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to load FAQs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
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
        order: Number(form.order),
      };

      if (editingId) {
        await api.put(
          `/faqs/${editingId}`,
          payload
        );

        toast.success(
          "FAQ updated successfully"
        );
      } else {
        await api.post(
          "/faqs",
          payload
        );

        toast.success(
          "FAQ created successfully"
        );
      }

      resetForm();

      await fetchFAQs();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to save FAQ"
      );
    } finally {
      setSaving(false);
    }
  };

  const editFAQ = (faq) => {
    setEditingId(faq._id);

    setForm({
      question:
        faq.question || "",

      answer:
        faq.answer || "",

      order:
        faq.order ?? 0,

      active:
        Boolean(faq.active),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteFAQ = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this FAQ?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(
        `/faqs/${id}`
      );

      setFaqs((current) =>
        current.filter(
          (faq) =>
            faq._id !== id
        )
      );

      toast.success(
        "FAQ deleted successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete FAQ"
      );
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner" />

        <p>
          Loading FAQs...
        </p>
      </div>
    );
  }

  return (
    <section className="admin-page">

      <div className="admin-page-header">

        <div>
          <h1>
            FAQs
          </h1>

          <p>
            Manage frequently asked
            questions.
          </p>
        </div>

      </div>

      <div className="admin-card">

        <div className="admin-card-header">

          <h2>
            {editingId
              ? "Edit FAQ"
              : "Create FAQ"}
          </h2>

        </div>

        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              Question
            </label>

            <input
              name="question"
              value={
                form.question
              }
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>
              Answer
            </label>

            <textarea
              name="answer"
              value={
                form.answer
              }
              onChange={handleChange}
              rows="6"
              required
            />

          </div>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Display Order
              </label>

              <input
                type="number"
                name="order"
                min="0"
                value={form.order}
                onChange={handleChange}
              />

            </div>

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
                ? "Update FAQ"
                : "Create FAQ"}
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
            Existing FAQs
          </h2>

        </div>

        {faqs.length === 0 ? (

          <div className="empty-state">

            <h3>
              No FAQs yet
            </h3>

            <p>
              Create your first FAQ
              above.
            </p>

          </div>

        ) : (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    Order
                  </th>

                  <th>
                    Question
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

                {faqs.map(
                  (faq) => (
                    <tr
                      key={
                        faq._id
                      }
                    >

                      <td>
                        {faq.order}
                      </td>

                      <td>
                        {faq.question}
                      </td>

                      <td>
                        {faq.active
                          ? "Yes"
                          : "No"}
                      </td>

                      <td>

                        <div className="table-actions">

                          <button
                            type="button"
                            onClick={() =>
                              editFAQ(
                                faq
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="danger-button"
                            onClick={() =>
                              deleteFAQ(
                                faq._id
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

export default FAQsAdmin;