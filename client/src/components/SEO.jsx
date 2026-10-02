import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
}) => {
  const siteTitle = "Veda Technology";

  const pageTitle = title
    ? `${title} | ${siteTitle}`
    : siteTitle;

  const pageDescription =
    description ||
    "Veda Technology — technology and development solutions.";

  return (
    <Helmet>
      <title>{pageTitle}</title>

      <meta
        name="description"
        content={pageDescription}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

      <meta
        property="og:title"
        content={pageTitle}
      />

      <meta
        property="og:description"
        content={pageDescription}
      />

      <meta
        property="og:type"
        content="website"
      />
    </Helmet>
  );
};

export default SEO;