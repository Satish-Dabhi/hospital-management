import {
  Image,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";
import React from "react";
const logo = require("../../images/logo.png"); // Replace with the actual path to your logo

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
  },
  italicName: {
    color: "#FFD580",
    textAlign: "center",
    margin: 0,
    fontSize: 10,
  },
  shreeGanesh: {
    color: "purple",
    textAlign: "center",
    margin: 0,
    fontWeight: 600,
    fontSize: 10,
  },
  header: {
    justifyContent: "space-between",
    marginTop: 5
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  sanjivani: {
    fontSize: 20,
    fontWeight: 600,
    color: "#990000",
  },
  hospital: {
    fontSize: 20,
    fontWeight: 600,
    color: "#204060",
    marginLeft: 3,
  },
  icu: {
    fontSize: 14,
    margin: 0,
    color: "#204060",
  },
  content: {
    fontWeight: 600,
    textAlign: "center",
    display: "flex",
    fontSize: 11,
  },
  contentH2: {
    color: "#b32d00",
    fontWeight: 600,
    fontSize: 12,
    margin: 0,
  },
  contentP: {
    margin: 0,
    color: "#005ce6",
  },
  contentDegree: {
    color: "#204060",
  },
  headerBottom: {
    backgroundColor: "#0073e6",
    fontWeight: 600,
    color: "#ffff",
    marginTop: 8,
    marginBottom: 8,
    justifyContent: "center",
    fontSize: 10,
  },
  headerBottomSpan: {
    padding: 5,
  },
});

const Header = () => (
  <>
    <View>
      <Text style={styles.shreeGanesh}>|| શ્રી ગણેશાય નમઃ ||</Text>
      {/* <Text style={styles.italicName}>Sanjivani</Text> */}
    </View>
    <View style={[styles.row, styles.header]}>
      <View style={[styles.row]}>
        <Image style={styles.logo} src={logo} alt="Logo" />
        <View>
          <View style={[styles.row, { justifyContent: 'center' }]}>
            <Text style={styles.sanjivani}>સંજીવની</Text>
            <Text style={styles.hospital}>હોસ્પિટલ</Text>
          </View>
          <Text style={styles.icu}>આઈ.સી.યુ. એન્ડ નર્સીંગ હોમ</Text>
        </View>
      </View>

      <View style={[styles.row]}>
        <View style={[styles.content, { alignItems: 'flex-start' }]}>
          <Text style={styles.contentH2}>ડૉ. મિલન સી મકવાણા</Text>
          <Text style={styles.contentDegree}>M.B., D.T.C.D., F.I.C.M.</Text>
          <Text style={styles.contentP}>
            કન્સલ્ટન્ટ ફીઝીશ્યન એન્ડ ઈન્ટેન્સીવીસ્ટ
          </Text>
          <Text style={styles.contentP}>ફેફસા અને હૃદયરોગના નિષ્ણાંત</Text>
        </View>
      </View>

      <View style={[styles.content, { alignItems: 'flex-end' }]}>
        <Text style={styles.contentH2}>ડૉ. સપના આર આઈલાણી</Text>
        <Text style={styles.contentDegree}>B.H.M.S.</Text>
        <Text style={styles.contentP}>
        મેડિકલ ઓફિસર
        </Text>
      </View>
    </View>

    <View style={[styles.row, styles.headerBottom]}>
      <Text style={styles.headerBottomSpan}>ICU |</Text>
      <Text style={styles.headerBottomSpan}>&nbsp;મેડીકલ સ્ટોર |</Text>
      <Text style={styles.headerBottomSpan}>&nbsp;એક્સ રે વિભાગ |</Text>
      <Text style={styles.headerBottomSpan}>&nbsp;લેબોરેટરી વિભાગ |</Text>
      <Text style={styles.headerBottomSpan}>&nbsp; પોઈઝન સેન્ટર |</Text>
      <Text style={styles.headerBottomSpan}>&nbsp;ઈમરજન્સી વિભાગ</Text>
    </View>
  </>
);

export default Header;
