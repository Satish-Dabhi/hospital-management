import {
  Image,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";

import React from "react";
import logo from "../../images/logo.png"; // Replace with the actual path to your logo

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
  },
  italicName: {
    color: "#003e9b",
    textAlign: "center",
    margin: 0,
    fontSize: 10,
  },
  shreeGanesh: {
    color: "#003e9b",
    textAlign: "center",
    margin: 0,
    fontWeight: 600,
    fontSize: 10,
  },
  header: {
    justifyContent: "space-between",
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  sanjivani: {
    fontSize: 30,
    fontWeight: 600,
    color: "#003e9b",
  },
  hospital: {
    fontSize: 20,
    fontWeight: 600,
    color: "#003e9b",
    marginTop: 7,
    marginLeft: 3,
  },
  icu: {
    fontSize: 10,
    margin: 0,
    color: "#003e9b",
    fontWeight: 600,
  },
  content: {
    fontWeight: 600,
    textAlign: "center",
    display: "flex",
    fontSize: 11,
  },
  contentH2: {
    color: "#003e9b",
    fontWeight: 600,
    fontSize: 12,
    margin: 0,
  },
  contentP: {
    margin: 0,
    color: "#003e9b",
  },
  contentDegree: {
    color: "#003e9b",
  },
  headerBottom: {
    backgroundColor: "#0073e6",
    fontWeight: 600,
    color: "#ffff",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    fontSize: 12,
  },
  headerBottomSpan: {
    padding: 5,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 3
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
  },
  tableCell: {
    padding: 5,
    border: 1,
    color: "#003e9b",
    fontSize: 10,
    borderRadius: 3,
    borderColor: "#003e9b"
  },
  w25Cell: {
    width: "25%",
  },
  w50Cell: {
    width: "50%",
  },
  w100Cell: {
    width: "100%",
  }
});

const BillHeader = ({ patient }) => (
  <>
    <View>
      <Text style={styles.shreeGanesh}>|| શ્રી ગણેશાય નમઃ ||</Text>
      <Text style={styles.italicName}>Sanjivani</Text>
    </View>
    <View style={[styles.row, styles.header]}>
      <View style={[styles.row]}>
        <Image style={styles.logo} src={logo} alt="Logo" />
        <View>
          <View style={[styles.row]}>
            <Text style={styles.sanjivani}>સંજીવની</Text>
            <Text style={styles.hospital}>હોસ્પિટલ</Text>
          </View>
          <View style={[styles.row, { justifyContent: 'flex-end' }]}>
            <Text style={styles.icu}>આઈ.સી.યુ. એન્ડ નર્સીંગ હોમ</Text>
          </View>
        </View>
      </View>
      <View style={[styles.content, { alignItems: 'flex-end' }]}>
        <Text style={styles.contentH2}>ડૉ. મિલન સી મકવાણા</Text>
        <Text style={styles.contentDegree}>M.B., D.T.C.D., F.I.C.M.</Text>
        <Text style={styles.contentP}>
          કન્સલ્ટન્ટ ફીઝીશ્યન એન્ડ ઈન્ટેન્સીવીસ્ટ
        </Text>
        <Text style={styles.contentP}>ફેફસા અને હૃદયરોગના નિષ્ણાંત</Text>
      </View>
    </View>

    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.w25Cell]}>Bill No.: {patient?.index}</Text>
        <Text style={[styles.tableCell, styles.w25Cell]}>InDoor No.:</Text>
        <Text style={[styles.tableCell, styles.w25Cell]}>OutDoor No.:</Text>
        <Text style={[styles.tableCell, styles.w25Cell]}>Date:</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.w100Cell]}>Patient Name.: {patient?.name}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.w50Cell]}>Address: {patient?.address}</Text>
        <Text style={[styles.tableCell, styles.w50Cell]}>Mo.: {patient?.contactNumber}</Text>
      </View>
    </View>
  </>
);

export default BillHeader;
