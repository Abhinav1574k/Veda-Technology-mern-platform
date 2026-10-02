import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";

const InquiriesAdmin = () => {
  const [inquiries, setInquiries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [updatingId, setUpdatingId] = useState(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);

      const response = await api.get("/inquiries");

      setInquiries(
  response.data.data || []
);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to load inquiries"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      await api.patch(
        `/inquiries/${id}/status`,
        { status }
      );

      setInquiries((current) =>
        current.map((inquiry) =>
          inquiry._id === id
            ? {
                ...inquiry,
                status,
              }
            : inquiry
        )
      );

      toast.success("Inquiry status updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update inquiry"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteInquiry = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/inquiries/${id}`);

      setInquiries((current) =>
        current.filter(
          (inquiry) => inquiry._id !== id
        )
      );

      toast.success("Inquiry deleted");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete inquiry"
      );
    }
  };

  const filteredInquiries = inquiries.filter(
    (inquiry) => {
      const searchText = search
        .trim()
        .toLowerCase();

      const matchesSearch =
        !searchText ||
        inquiry.name
          ?.toLowerCase()
          .includes(searchText) ||
        inquiry.email
          ?.toLowerCase()
          .includes(searchText) ||
        inquiry.subject
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" ||
        inquiry.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner" />

        <p>Loading inquiries...</p>
      </div>
    );
  }

  return (
    <section className="admin-page">

      <div className="admin-page-header">
        <div>
          <h1>Inquiries</h1>

          <p>
            Manage contact form submissions.
          </p>
        </div>
      </div>

      <div className="admin-filters">

        <input
          type="text"
          placeholder="Search by name, email or subject..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="ALL">
            All Statuses
          </option>

          <option value="NEW">
            New
          </option>

          <option value="IN_PROGRESS">
            In Progress
          </option>

          <option value="RESOLVED">
            Resolved
          </option>

          <option value="ARCHIVED">
            Archived
          </option>
        </select>

      </div>

      <div className="admin-card">

        {filteredInquiries.length === 0 ? (

          <div className="empty-state">

            <h3>
              No inquiries found
            </h3>

            <p>
              {search || statusFilter !== "ALL"
                ? "Try changing your search or filter."
                : "New contact submissions will appear here."}
            </p>

          </div>

        ) : (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredInquiries.map(
                  (inquiry) => (
                    <tr key={inquiry._id}>

                      <td>
                        {inquiry.name}
                      </td>

                      <td>
                        <a
                          href={`mailto:${inquiry.email}`}
                        >
                          {inquiry.email}
                        </a>
                      </td>

                      <td>
                        {inquiry.subject}
                      </td>

                      <td>
                        <div
                          style={{
                            maxWidth: "320px",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {inquiry.message}
                        </div>
                      </td>

                      <td>

                        <select
                          value={inquiry.status}
                          disabled={
                            updatingId ===
                            inquiry._id
                          }
                          onChange={(event) =>
                            updateStatus(
                              inquiry._id,
                              event.target.value
                            )
                          }
                        >
                          <option value="NEW">
                            New
                          </option>

                          <option value="IN_PROGRESS">
                            In Progress
                          </option>

                          <option value="RESOLVED">
                            Resolved
                          </option>

                          <option value="ARCHIVED">
                            Archived
                          </option>
                        </select>

                      </td>

                      <td>
                        {formatDate(
                          inquiry.createdAt
                        )}
                      </td>

                      <td>

                        <button
                          type="button"
                          className="danger-button"
                          onClick={() =>
                            deleteInquiry(
                              inquiry._id
                            )
                          }
                        >
                          Delete
                        </button>

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

export default InquiriesAdmin;