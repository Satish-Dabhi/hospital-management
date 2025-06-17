import EditIcon from "@mui/icons-material/Edit";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDateFormate } from "../../Services/util";
import PDFDialog from "../PDFDialog";
import PatientBill from "../generateInvoice/PatientBill";
import PatientData from "../generateInvoice/PatientData";

const UserTable = ({ records }) => {
  const [tableData, setTableData] = useState({});
  const [selectedPatientData, setSelectedPatientData] = useState({});
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [showBillPdfViewer, setShowBillPdfViewer] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handlePdfViewerClose = () => {
    setShowPdfViewer(false);
  };


  const handleBillPdfViewerClose = () => {
    setShowBillPdfViewer(false);
  };


  const navigate = useNavigate();

  useEffect(() => {
    const filteredData =
      Object.keys(records).length > 0 &&
      records
        .filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((item, index) => ({
          ...item,
          id: index + 1,
          date: getDateFormate(item.date),
        }));

    setTableData(filteredData);
  }, [records, searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const columns = [
    { field: "id", headerName: "No.", width: 70 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "age", headerName: "Age", width: 80 },
    { field: "gender", headerName: "Gender", width: 100 },
    {
      field: "address",
      headerName: "Address",
      width: 180,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 70,
      renderCell: renderEditCell,
    },
    {
      field: "letterPad",
      headerName: "Letter Pad",
      width: 70,
      renderCell: renderDownloadLetterPad,
    },
    {
      field: "bill",
      headerName: "Bill",
      width: 70,
      renderCell: renderBillCell,
    },
    // { field: 'delete', headerName: 'Delete', width: 70, renderCell: renderDeleteCell },
  ];

  function renderEditCell(params) {
    const handleEditClick = () => {
      // Handle the edit button click event
      const selectedFormData = params.row;
      const { _id } = selectedFormData;
      navigate(`/patient/${_id}`);
    };

    return (
      <IconButton onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
    );
  }

  function renderBillCell(params) {
    const selectedFormData = params.row;
    const handleDownloadBillClick = () => {
      // Handle the edit button click event
      setShowBillPdfViewer(true);
      setSelectedPatientData(selectedFormData);
    };
    if (isMobile) {
      return (
        <PDFDownloadLink
          document={<PatientBill patient={selectedFormData} />}
          fileName={"patient_bill.pdf"}
        >
          {({ blob, url, loading, error }) => (
            <IconButton>
              <ReceiptLongIcon />
            </IconButton>
          )}
        </PDFDownloadLink>
      );
    } else {
      return (
        <IconButton onClick={handleDownloadBillClick}>
          <ReceiptLongIcon />
        </IconButton>
      );
    }
  };


  function renderDownloadLetterPad(params) {
    const selectedFormData = params.row;

    const handleDownloadLetterPadClick = () => {
      // Handle the edit button click event
      setShowPdfViewer(true);
      setSelectedPatientData(selectedFormData);
    };
    if (isMobile) {
      return (
        <PDFDownloadLink
          document={<PatientData patient={selectedFormData} />}
          fileName={"letterpad.pdf"}
        >
          {({ blob, url, loading, error }) => (
            <IconButton>
              <FilePresentIcon />
            </IconButton>
          )}
        </PDFDownloadLink>
      );
    } else {
      return (
        <IconButton onClick={handleDownloadLetterPadClick}>
          <FilePresentIcon />
        </IconButton>
      );
    }
  }

  const isMobile = window.innerWidth <= 600;

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <TextField
          label="Search Patient by Name"
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleSearchChange}
          value={searchText}
        />
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            overflowX: "scroll",
            width: `100%`,
          }}
        // onRowSelectionModelChange={handleSelectionChange}
        />
      </div>
      {/* Dialog for Letter PDF Viewer */}
      <PDFDialog open={showPdfViewer}
        onClose={handlePdfViewerClose}
        data={<PatientData patient={selectedPatientData} />} />

      {/* Dialog for Patient Bill PDF Viewer */}
      <PDFDialog open={showBillPdfViewer}
        onClose={handleBillPdfViewerClose}
        data={<PatientBill patient={selectedPatientData} />} />

    </>
  );
};

export default UserTable;
