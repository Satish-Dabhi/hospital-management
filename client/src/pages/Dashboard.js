import { Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import DashboardLayout from "../layout/DashboardLayout";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout>
        <Helmet>
          <title>Dashboard | Sanjivni Dashboard</title>
        </Helmet>

        <Typography variant="h6" component="h2">
          Hi, Welcome in Sanjivni Dashboard.
        </Typography>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
