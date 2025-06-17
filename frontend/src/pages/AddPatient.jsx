import { Container, Typography } from "@mui/material";
import { GET_API, GET_PATIENT_BY_ID } from "../Services/api";
import { useEffect, useState } from "react";

import DashboardLayout from "../layout/DashboardLayout";
import RegisterPatientForm from "../components/Form/RegisterPatientForm";
import { useParams } from "react-router";

const AddPatient = () => {
  const [patient, setPatient] = useState({});
  const [editPatient, setEditPatient] = useState(false);
  const [pId, setPId] = useState("");
  const { patientId } = useParams();

  useEffect(() => {
    async function fetchPatientData() {
      const api = GET_PATIENT_BY_ID.replace("${patientId}", patientId);

      const patientData = await GET_API(api);
      if (patientData?.status === "OK") {
        setPatient(patientData?.data);
        setEditPatient(true);
        setPId(patientId);
      }
    }
    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  return (
    <DashboardLayout>
      <title>Patient | Arogya Care Hub</title>

      <Container maxWidth="md" className="form_Container">
        <Typography variant="h4" className="form-title">
          {editPatient ? `Edit ${patient?.name}'s Form` : "Add Patient Form"}{" "}
        </Typography>
        <RegisterPatientForm
          data={patient}
          editPatient={editPatient}
          pId={pId}
        />
      </Container>
    </DashboardLayout>
  );
};

export default AddPatient;
