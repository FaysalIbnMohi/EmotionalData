import PropTypes from "prop-types";

export const SectionTitle = ({ title }) => {
    return <h2 className="text-2xl font-bold">{title}</h2>;
};

SectionTitle.propTypes = {
    title: PropTypes.string,
};

SectionTitle.defaultProps = {
    title: "Title",
};
