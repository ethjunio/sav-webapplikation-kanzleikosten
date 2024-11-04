import React from 'react';
import { Page, Font, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import content from '../assets/content.json';
import { useLanguage } from '../context/LanguageContext';
import { languageContentType } from '../types/languageContentType';

Font.register({
	family: 'Roboto',
	fonts: [
		{ src: '/fonts/Roboto-Regular.ttf', fontWeight: 'normal' },
		{ src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
	],
});

interface inputDataType {
	name: string[];
	value: string[];
	unit: string[];
}

interface plotImageInterface {
	[key: string]: string;
}

interface tableImageInterface {
	[key: string]: string;
}

interface summaryText {
	[key: string]: string;
}

interface reportDataTypes {
	inputData: inputDataType;
	plotImages: plotImageInterface;
	tableImages: tableImageInterface;
	summary: summaryText;
}

// Create styles
const styles = StyleSheet.create({
	page: {
		display: 'flex',
		flexDirection: 'column',
		fontFamily: 'Roboto',
		paddingVertical: 50,
		paddingHorizontal: 20,
	},
	section: {
		display: 'flex',
		marginHorizontal: 30,
		marginVertical: 10,
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		position: 'absolute',
		fontSize: 10,
		color: 'grey',
		top: 0,
		left: 0,
		right: 0,
		height: 40, // Adjust as needed
		paddingHorizontal: 50,
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
	footer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 30, // Adjust as needed
		paddingHorizontal: 50,

		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	pageNumber: {
		fontSize: 10,
		color: 'grey',
	},
	table: {
		width: '100%',
		overflow: 'hidden',
	},
	tableRow: {
		flexDirection: 'row',
		backgroundColor: '#f8f8f8',
	},
	tableHeaderRow: {
		flexDirection: 'row',
		backgroundColor: '#284C93',
	},
	tableCol: {
		width: '50%',
		padding: 8,
		borderStyle: 'solid',
		borderWidth: 0.5,
		borderColor: '#ddd',
	},
	tableHeaderCol: {
		width: '50%',
		padding: 8,
		backgroundColor: '#284C93',
		borderStyle: 'solid',
		borderWidth: 0.5,
		borderColor: '#ddd',
	},
	tableHeaderCell: {
		fontSize: 11,
		paddingHorizontal: 12,
		textAlign: 'left',

		color: '#fff',
		fontWeight: 'bold',
	},
	tableCell: {
		fontSize: 10,
		paddingHorizontal: 12,
		textAlign: 'left',
		color: '#333',
	},
	alternateRow: {
		backgroundColor: '#e9f0f8',
	},
	H1: {
		color: '#284C93',
		fontSize: 28,
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		marginBottom: 7,
	},
	H2: {
		color: '#284C93',
		fontSize: 18,
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		marginBottom: 7,
	},
	H4: {
		fontSize: 10,
		fontFamily: 'Roboto',
		fontWeight: 'bold',
		marginBottom: 5,
		alignSelf: 'center',
	},
	p: {
		fontSize: 12,
		fontFamily: 'Roboto',
		lineHeight: 1.3,
		marginBottom: 10,
		textAlign: 'justify',
	},
	legend: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
		alignItems: 'flex-start',
		lineHeight: 0,
		fontSize: 10,
	},
	box: {
		marginStart: 36,
		marginTop: 6,
		width: 30,
		height: 13,
		marginEnd: 8,
		borderRadius: 2,
	},
	legendContainer: {
		display: 'flex',
		flexDirection: 'column',
		width: '70%',
		gap: 6,
		marginBottom: 30,
	},
});

const Header = ({ pageContent }: { pageContent: any }) => (
	<View style={styles.header} fixed>
		<Text>{pageContent.report.header1}</Text>
		<Text>{pageContent.report.header2}</Text>
		<Text>{new Date().toLocaleDateString()}</Text>
	</View>
);

const Footer = ({ pageContent }: { pageContent: any }) => (
	<View style={styles.footer} fixed>
		{/* Footer content */}
		<Text style={styles.pageNumber}>{pageContent.report.footerText}</Text>
		<Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
	</View>
);

const IntroSection = ({ inputData, pageContent }: { inputData: inputDataType; pageContent: any }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.H1}>{pageContent.report.titel}</Text>
			<Text style={styles.H2}>1. {pageContent.report.introTitel}</Text>
			<Text style={styles.p}>{pageContent.report.introduction}</Text>
			<Text style={styles.H2}>2. {pageContent.report.limitationTitel}</Text>
			<Text style={styles.p}>{pageContent.report.limitations}</Text>
			<Text style={styles.H2}>3. {pageContent.report.inputSectionTitel}</Text>
			<Text style={styles.p}>{pageContent.report.inputSection}</Text>
			<View style={styles.table} wrap={false}>
				{/* Single Header Row */}
				<View style={styles.tableHeaderRow}>
					<View style={styles.tableHeaderCol}>
						<Text style={styles.tableHeaderCell}>{pageContent.report.tabelKey}</Text>
					</View>
					<View style={styles.tableHeaderCol}>
						<Text style={styles.tableHeaderCell}>{pageContent.report.tabelValue}</Text>
					</View>
				</View>

				{/* Table Rows */}
				{inputData.name.slice(0, -1).map((name, index) => (
					<View style={[styles.tableRow, ...(index % 2 === 1 ? [styles.alternateRow] : [])]} key={index}>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>{name}</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>
								{inputData.value[index]} {inputData.unit[index]}
							</Text>
						</View>
					</View>
				))}
			</View>
		</View>
	);
};

const CostPlotSection = ({ plotImages, pageContent }: { plotImages: plotImageInterface; pageContent: any }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.H2}>5. {pageContent.costPlot.titel}</Text>
			<Text style={styles.p}>{pageContent.costPlot.description}</Text>
			<View style={styles.legendContainer}>
				<View style={styles.legend}>
					<View style={[styles.box, { backgroundColor: '#BFC9DF' }]} />
					<Text style={{ paddingTop: 5 }}>{pageContent.costPlot.descriptionRegression}</Text>
				</View>
				<View style={styles.legend}>
					<View style={[styles.box, { backgroundColor: '#DED8CA' }]} />
					<Text style={{ paddingTop: 5 }}>{pageContent.costPlot.descriptionStatistical}</Text>
				</View>
			</View>
			<View>
				{plotImages.costPlotYearly && (
					<>
						<Text style={styles.H4}>{pageContent.stackedBarPlotCost.yearlyCosts}</Text>
						<Image src={plotImages.costPlotYearly} style={{ marginBottom: 20, height: 250, width: '100%', objectFit: 'contain' }} />
					</>
				)}

				{plotImages.costPlotOnce && (
					<>
						<Text style={styles.H4}>{pageContent.stackedBarPlotCost.oneTimeCosts}</Text>
						<Image src={plotImages.costPlotOnce} style={{ height: 250, width: '100%', objectFit: 'contain' }} />
					</>
				)}
			</View>
		</View>
	);
};

const KnazleiPlotSection = ({ plotImages, pageContent }: { plotImages: plotImageInterface; pageContent: any }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.H2}>4. {pageContent.firmPlot.titel}</Text>
			<Text style={styles.p}>{pageContent.firmPlot.description}</Text>
			<View style={styles.legendContainer}>
				<View style={styles.legend}>
					<View style={[styles.box, { backgroundColor: '#BFC9DF' }]} />
					<Text style={{ paddingTop: 5 }}>{pageContent.firmPlot.yourFirm}</Text>
				</View>
				<View style={styles.legend}>
					<View style={[styles.box, { backgroundColor: '#F4F1EA' }]} />
					<Text style={{ paddingTop: 5 }}>{pageContent.firmPlot.referenceFirm}</Text>
				</View>
			</View>
			{plotImages.kanzleiPlot !== '' && <Image src={plotImages.kanzleiPlot} style={{ height: 500, objectFit: 'contain' }} />}{' '}
		</View>
	);
};

const CostTableSection = ({ tableImages, pageContent, summaryText }: { tableImages: tableImageInterface; pageContent: any; summaryText: summaryText }) => {
	return (
		<View style={styles.section}>
			<Text style={styles.H2}>6. {pageContent.summeryCard.titel}</Text>
			<Text style={styles.p}>{summaryText.text}</Text>
			{tableImages.yearly && <Image src={tableImages.yearly} style={{ width: '80%', alignSelf: 'center', marginVertical: 20 }} />}
			{tableImages.once && <Image src={tableImages.once} style={{ width: '80%', alignSelf: 'center', marginVertical: 20 }} />}
		</View>
	);
};

const GenerateReport = ({ reportData, language }: { reportData: reportDataTypes; language: string }) => {
	console.log(reportData);
	const pageContent = (content as languageContentType)[language as keyof typeof content];
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<Header pageContent={pageContent} />
				<IntroSection inputData={reportData.inputData} pageContent={pageContent} />
				<Footer pageContent={pageContent} />
			</Page>
			<Page size="A4" style={styles.page}>
				<Header pageContent={pageContent} />
				<KnazleiPlotSection plotImages={reportData.plotImages} pageContent={pageContent} />
				<Footer pageContent={pageContent} />
			</Page>
			<Page size="A4" style={styles.page}>
				<Header pageContent={pageContent} />
				<CostPlotSection plotImages={reportData.plotImages} pageContent={pageContent} />
				<Footer pageContent={pageContent} />
			</Page>
			<Page size="A4" style={styles.page}>
				<Header pageContent={pageContent} />
				<CostTableSection tableImages={reportData.tableImages} summaryText={reportData.summary} pageContent={pageContent} />
				<Footer pageContent={pageContent} />
			</Page>
		</Document>
	);
};

export default GenerateReport;