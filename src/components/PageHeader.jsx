import PropTypes from "prop-types";

export const PageHeader = ({ title, description, icon, icon2 = null }) => {
    return (
        <div className="flex items-center gap-8 rounded-xl bg-greenBg p-6 text-white">
            <div>
                <h2 className="text-7xl">{icon}</h2>
            </div>
            <div>
                <h2 className="text-3xl font-bold">{title}</h2>
                <div className="mt-4 flex items-center gap-1">
                    {icon2 && <p>{icon2}</p>}
                    <p className=" text-lg font-normal">{description}</p>
                </div>
            </div>
        </div>
    );
};

PageHeader.propTypes = {
    icon: PropTypes.any,
    icon2: PropTypes.any,
    title: PropTypes.string,
    description: PropTypes.string,
};

PageHeader.defaultProps = {
    icon2: null,
};
