import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { PDFViewer } from '@react-pdf/renderer'
import React from 'react';
import CloseIcon from "@mui/icons-material/Close";


const PDFDialog = ({ data, open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
            maxWidth={"md"}
        >
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
                PDF Viewer
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <PDFViewer width="100%" height="600px">
                    {data}
                </PDFViewer>
            </DialogContent>
        </Dialog>
    )
}

export default PDFDialog