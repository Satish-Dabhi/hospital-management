import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import Footer from "./Footer";
import Header from "./Header";
import React from "react";
import boldFont from "../../fonts/NotoSansGujarati-Bold.ttf";
import font from "../../fonts/NotoSansGujarati-Regular.ttf";
import logo from "../../images/logo.png"; // Replace with the actual path to your logo

Font.register({
  family: "NotoSansGujarati",
  format: "truetype",
  fonts: [
    { src: font, fontWeight: 400 },
    { src: boldFont, fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansGujarati",
    boxSizing: "border-box",
    width: "100%",
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
  },
  mainContent: {
    flexGrow: 1,
    position: "relative",
    textAlign: "center",
    alignItems: "center",
    top: "7%",
  },
  logo: {
    width: "50%",
    height: "auto",
    opacity: 0.1,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontSize: 9,
    fontWeight: 600,
  },
  value: {
    marginLeft: 5,
    paddingLeft: 7,
    width: "85%",
    borderBottom: "1px dotted #000",
    fontSize: 9,
  },
  w60: {
    width: "60%",
  },
  w70: {
    width: "70%",
  },
  w15: {
    width: "15%",
  },
  w30: {
    width: "30%",
  },
  w40: {
    width: "40%",
  },
  w25: {
    width: "25%",
  },
  w20: {
    width: "20%",
  },
  w50: {
    width: "50%",
  },
  w100: {
    width: "100%",
  },
});

const PatientData = ({ patient }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Header />
        <View style={styles.rowContainer}>
          <View style={[styles.w40, styles.rowContainer]}>
            <Text style={styles.label}>Name :</Text>
            <Text style={styles.value}>{patient?.name}</Text>
          </View>
          <View style={[styles.w25, styles.rowContainer]}>
            <Text style={styles.label}>Age/Sex :</Text>
            <Text style={styles.value}>
              {patient?.age} Yrs / {patient?.gender}
            </Text>
          </View>
          <View style={[styles.w15, styles.rowContainer]}>
            <Text style={styles.label}>Weight :</Text>
            <Text style={styles.value}>{patient?.weight}</Text>
          </View>
          <View style={[styles.w20, styles.rowContainer]}>
            <Text style={styles.label}>Date :</Text>
            <Text style={styles.value}>{patient?.date}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.w60, styles.rowContainer]}>
            <Text style={styles.label}>Address :</Text>
            <Text style={styles.value}>{patient?.address}</Text>
          </View>
          <View style={[styles.w40, styles.rowContainer]}>
            <Text style={styles.label}>Mo. :</Text>
            <Text style={styles.value}>{patient?.contactNumber}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.w50, styles.rowContainer]}>
            <Text style={styles.label}>ReferDr :</Text>
            <Text style={styles.value}>{patient?.referDoctor}</Text>
          </View>
          <View style={[styles.w50, styles.rowContainer]}>
            <Text style={styles.label}>ConsultantDr :</Text>
            <Text style={styles.value}>{patient?.consultantDoctor}</Text>
          </View>
        </View>
      </View>
      <View style={styles.mainContent}>
        <Image style={styles.logo} src={logo} alt="Logo" />
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </Page>
  </Document>
);

export default PatientData;
