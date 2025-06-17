import {
    StyleSheet,
    Text,
    View
} from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
    table: {
        display: "table",
        width: "100%",
    },
    tableRow: {
        flexDirection: "row",
        width: "100%",
    },
    tableCell: {
        padding: 5,
        textAlign: "center",
        border: 1,
        color: "#003e9b",
        borderRadius: 3,
        borderColor: "#003e9b",
    },
    headerCell: {
        fontSize: 12,
        fontWeight: "bold",
    },
    DoubleCell: {
        fontSize: 10,
        width: "55%",
    },
    cell: {
        fontSize: 10,
        width: "15%",
    },
    combinedRow: {
        flexDirection: "row",
        width: "100%",
    },
    noteCell: {
        fontSize: 10,
        width: "70%",
        borderRight: 0,
        textAlign: 'left'
    },
    totalCell: {
        fontSize: 10,
        width: "30%",
        textAlign: 'left'
    },
    emptyCell: {
        width: "70%", // Empty cell width matching other cells
    },
    emptyCellW50: {
        width: "50%", // Empty cell width matching other cells
    },
    mt10: {
        marginTop: 10, // Empty cell width matching other cells
    },
    mt30: {
        marginTop: 30, // Empty cell width matching other cells
    },
    w100: {
        width: '100%'
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        fontWeight: 600,
        color: "#003e9b",
    },
    value: {
        marginLeft: 5,
        paddingLeft: 7,
        width: "85%",
        borderBottom: "1px dotted #000",
        fontSize: 12,
        color: "#003e9b",
    },
});

const BillTable = ({ billCharges }) => {
    let totalSum = 0;
    return (
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.DoubleCell, styles.headerCell]}>Charge Detail</Text>
                <Text style={[styles.tableCell, styles.cell, styles.headerCell]}>Charge</Text>
                <Text style={[styles.tableCell, styles.cell, styles.headerCell]}>Days</Text>
                <Text style={[styles.tableCell, styles.cell, styles.headerCell]}>Amount</Text>
            </View>
            {billCharges && billCharges.length > 0 ? billCharges.map((charge) => {
                const amount = calculateAmount(charge);
                totalSum += amount;
                return (
                    <View key={charge._id} style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.DoubleCell]}>{getChargeDescription(charge.chargeList)}</Text>
                        <Text style={[styles.tableCell, styles.cell]}>{getChargeAmount(charge.chargeList)}</Text>
                        <Text style={[styles.tableCell, styles.cell]}>{charge.days}</Text>
                        <Text style={[styles.tableCell, styles.cell]}>{calculateAmount(charge)}</Text>
                    </View>)
            }) :
                <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.w100, styles.headerCell]}>No Bill DATA Found</Text>
                </View>
            }
            {/* Combined Row for Note and Total/Deposit/Remaining */}
            <View style={[styles.combinedRow, styles.mt10]}>
                {/* Note Row */}
                <Text style={[styles.tableCell, styles.noteCell]}>{`Note:`}</Text>
                {/* Total Row */}
                <Text style={[styles.tableCell, styles.totalCell]}>{`Total: ${totalSum}`}</Text>
            </View>
            {/* Deposit Row */}
            <View style={styles.combinedRow}>
                <View style={styles.emptyCell} />
                <Text style={[styles.tableCell, styles.totalCell]}>{`Deposit:`}</Text>
            </View>
            {/* Remaining Row */}
            <View style={styles.combinedRow}>
                <View style={styles.emptyCell} />
                <Text style={[styles.tableCell, styles.totalCell]}>{`Remaining:`}</Text>
            </View>
            <View style={[styles.combinedRow, styles.mt30]}>
                <View style={styles.emptyCellW50} />
                <View style={[styles.rowContainer]}>
                    <Text style={styles.label}>નાણા લેનાર ની સહી:</Text>
                    <Text style={styles.value}></Text>
                </View>
            </View>
        </View>
    )
};

const getChargeDescription = (chargeList) => {
    return chargeList.split("-")[0].trim();
};

const getChargeAmount = (chargeList) => {
    const amount = chargeList.split("-")[1].trim();
    return amount;
};

const calculateAmount = (charge) => {
    const amount = parseInt(charge.chargeList.split("-")[1].trim());
    return amount * charge.days;
};

export default BillTable;
