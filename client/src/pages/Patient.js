import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { GET_ALL_PATIENT, GET_API } from "../Services/api";
import UserHeader from "../components/User/UserHeader";
import UserTable from "../components/User/UserTable";
import DashboardLayout from "../layout/DashboardLayout";

const Patient = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const patientData = await GET_API(GET_ALL_PATIENT);
      if (patientData?.status === 'OK') {
        setRecords(patientData?.data);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <DashboardLayout>
        <Helmet>
          <title>Users | Sanjivni Dashboard</title>
        </Helmet>

        <Container maxWidth="md" disableGutters>
          <UserHeader />
          <UserTable records={records} />
        </Container>
      </DashboardLayout>
    </>
  );
};

export default Patient;
