import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [
        servicesResponse,
        programsResponse,
        faqsResponse,
        inquiriesResponse,
      ] = await Promise.all([
        api.get("/services/admin/all"),
        api.get("/programs/admin/all"),
        api.get("/faqs/admin/all"),
        api.get("/inquiries"),
      ]);

      setServices(
  servicesResponse.data.data || []
);

setPrograms(
  programsResponse.data.data || []
);

setFaqs(
  faqsResponse.data.data || []
);

setInquiries(
  inquiriesResponse.data.data || []
);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const totalInquiries =
    inquiries.length;

  const newInquiries =
    inquiries.filter(
      (item) =>
        item.status === "NEW"
    ).length;

  const inProgressInquiries =
    inquiries.filter(
      (item) =>
        item.status === "IN_PROGRESS"
    ).length;

  const resolvedInquiries =
    inquiries.filter(
      (item) =>
        item.status === "RESOLVED"
    ).length;

  const latestInquiries = [
    ...inquiries,
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner" />

        <p>
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <section className="admin-page">

      <div className="admin-page-header">

        <div>
          <h1>
            Dashboard
          </h1>

          <p>
            Overview of the Veda Technology
            platform.
          </p>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="stat-card">
          <span>
            Total Services
          </span>

          <strong>
            {services.length}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Total Programs
          </span>

          <strong>
            {programs.length}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Total FAQs
          </span>

          <strong>
            {faqs.length}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Total Inquiries
          </span>

          <strong>
            {totalInquiries}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            New Inquiries
          </span>

          <strong>
            {newInquiries}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            In Progress
          </span>

          <strong>
            {inProgressInquiries}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Resolved
          </span>

          <strong>
            {resolvedInquiries}
          </strong>
        </div>

      </div>

      <div className="admin-card">

        <div className="admin-card-header">

          <div>
            <h2>
              Latest Inquiries
            </h2>

            <p>
              Most recent contact
              submissions.
            </p>
          </div>

        </div>

        {latestInquiries.length === 0 ? (

          <div className="empty-state">

            <h3>
              No inquiries yet
            </h3>

            <p>
              New contact submissions
              will appear here.
            </p>

          </div>

        ) : (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>
                    Name
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Subject
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>

                {latestInquiries.map(
                  (inquiry) => (
                    <tr
                      key={
                        inquiry._id
                      }
                    >

                      <td>
                        {inquiry.name}
                      </td>

                      <td>
                        {inquiry.email}
                      </td>

                      <td>
                        {inquiry.subject}
                      </td>

                      <td>
                        <span
                          className={`status-badge status-${inquiry.status.toLowerCase()}`}
                        >
                          {inquiry.status.replace(
                            "_",
                            " "
                          )}
                        </span>
                      </td>

                      <td>
                        {new Date(
                          inquiry.createdAt
                        ).toLocaleString()}
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

export default Dashboard;