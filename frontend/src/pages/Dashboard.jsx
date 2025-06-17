import DashboardLayout from "../layout/DashboardLayout";
import { Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout>
        <title>Dashboard | Arogya Care Hub</title>

        <Typography variant="h6" component="h2">
          Hi, Welcome in Arogya Care Hub.
        </Typography>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
