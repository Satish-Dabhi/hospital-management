import { GET_ALL_PATIENT, GET_API } from "../Services/api";
import { useEffect, useState } from "react";

import { Container } from "@mui/material";
import DashboardLayout from "../layout/DashboardLayout";
import UserHeader from "../components/User/UserHeader";
import UserTable from "../components/User/UserTable";

const Patient = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const patientData = await GET_API(GET_ALL_PATIENT);
      if (patientData?.status === "OK") {
        setRecords(patientData?.data);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <DashboardLayout>
        <title>Users | Arogya Care Hub</title>

        <Container maxWidth="md" disableGutters>
          <UserHeader />
          <UserTable records={records} />
        </Container>
      </DashboardLayout>
    </>
  );
};

export default Patient;
