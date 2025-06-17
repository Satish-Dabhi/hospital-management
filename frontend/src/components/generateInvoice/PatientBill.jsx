import { Document, Font, Page, StyleSheet, View } from "@react-pdf/renderer";

import BillHeader from "./BillHeader";
import BillTable from "./BillTable";
import React from "react";
import boldFont2 from "../../fonts/NotoSansGujarati-Bold.ttf";
import font2 from "../../fonts/NotoSansGujarati-Regular.ttf";

Font.register({
  family: "NotoSansGujarati",
  format: "truetype",
  fonts: [
    { src: font2, fontWeight: 400 },
    { src: boldFont2, fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column", // Set the direction to column
    fontFamily: "NotoSansGujarati",
    boxSizing: "border-box",
    width: "100%",
    height: "100%", // Set height to 100%
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "gray",
    marginTop: "auto", // Push the footer to the bottom
  },
  mainContent: {
    flexGrow: 1,
    position: "relative",
    textAlign: "center",
    alignItems: "center",
  },
});

const PatientBill = ({ patient }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <BillHeader patient={patient} />
      </View>
      <View style={styles.mainContent}>
        <BillTable billCharges={patient?.billCharges} />
      </View>
      <View style={styles.footer}>{/* <Footer /> */}</View>
    </Page>
  </Document>
);

export default PatientBill;
