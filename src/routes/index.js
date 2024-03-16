// All components mapping with path for internal routes
import { lazy } from "react";

const Dashboard = lazy(() => import("../modules/Home"));
const Accounts = lazy(() => import("../modules/Accounts"));
const HelpSupport = lazy(() => import("../modules/HelpSupport"));
const ManageCustomer = lazy(() => import("../modules/ManageCustomer"));
const MyEarnings = lazy(() => import("../modules/MyEarnings"));
const SimActivation = lazy(() => import("../modules/SimActivation"));
const RetailerTool = lazy(() => import("../modules/RetailerTool"));
const ReportSummary = lazy(() => import("../modules/MyEarnings/components/ReportSummary"));
const InstantReport = lazy(() => import("../modules/MyEarnings/components/ReportInstant"));
const RetailerProfile = lazy(() => import("../modules/Accounts/subpages/RetailerProfile"));
const AddFunds = lazy(() => import("../modules/Accounts/subpages/AddFunds"));
const Videos = lazy(() => import("../modules/HelpSupport/videos"));

/**
 * page er url gula ekhane declare kora hoise
 * jate sohoje onno kono component e import kora jay
 * and string copy paste korar jhamela thake na
 * example: onClick={() => navigate("/app" + PAGES.RETAILER_PROFILE)}
 * example: <Link to={"/app" + PAGES.RETAILER_PROFILE}>Retailer Profile</Link>
 */
export const PAGES = {
    DASHBOARD: "/dashboard",
    MY_EARNINGS: "/my-earnings",
    REPORT_SUMMARY: "/my-earnings/report-summary",
    INSTANT_REPORT: "/my-earnings/instant-report",
    RETAILER_TOOL: "/retailer-tool",
    SIM_ACTIVATION: "/sim-activation",
    ACCOUNTS: "/accounts",
    RETAILER_PROFILE: "/accounts/retailer-profile",
    ADD_FUNDS: "/accounts/add-funds",
    MANAGE_CUSTOMER: "/manage-customer",
    HELP_SUPPORT: "/help-support",
    HELP_SUPPORT_VIDEOS: "/help-support/videos"
};

const routes = [
    {
        path: PAGES.DASHBOARD, // the url
        component: Dashboard, // view rendered
    },
    {
        path: PAGES.MY_EARNINGS, // the url
        component: MyEarnings, // view rendered
    },
    {
        path: PAGES.REPORT_SUMMARY, // the url
        component: ReportSummary, // view rendered
    },
    {
        path: PAGES.INSTANT_REPORT, // the url
        component: InstantReport, // view rendered
    },
    {
        path: PAGES.RETAILER_TOOL, // the url
        component: RetailerTool, // view rendered
    },
    {
        path: PAGES.SIM_ACTIVATION, // the url
        component: SimActivation, // view rendered
    },
    {
        path: PAGES.ACCOUNTS, // the url
        component: Accounts, // view rendered
    },
    {
        path: PAGES.RETAILER_PROFILE, // the url
        component: RetailerProfile, // view rendered
    },
    {
        path: PAGES.ADD_FUNDS, // the url
        component: AddFunds, // view rendered
    },
    {
        path: PAGES.MANAGE_CUSTOMER, // the url
        component: ManageCustomer, // view rendered
    },
    {
        path: PAGES.HELP_SUPPORT, // the url
        component: HelpSupport, // view rendered
    },
    {
        path: PAGES.HELP_SUPPORT_VIDEOS, //the url
        component: Videos, // view rendered
    },
];

export default routes;
