import { RiRefund2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../routes/index.js";
import PropTypes from "prop-types";

export const CardLink = ({ title, icon, path }) => {
    const navigate = useNavigate();

    return (
        <div
            className="flex w-1/3 cursor-pointer items-center justify-normal gap-3 rounded-xl  border-2 border-green-200  bg-white p-4"
            onClick={() => navigate("/app" + path)}
        >
            <div>{icon}</div>

            <div>
                <button className="font-bold">{title}</button>
            </div>
        </div>
    );
};

CardLink.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.any,
    path: PropTypes.string,
};

CardLink.defaultProps = {
    title: "Retailer Profile",
    icon: <RiRefund2Line />,
    path: PAGES.DASHBOARD,
};
