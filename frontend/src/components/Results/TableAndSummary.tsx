import TableEntry from './TableEntry';
import classifyOutput from '../../utils/classifyOutput';
import React from 'react';
import { languageContentType } from '../../types/languageContentType';
import { useLanguage } from '../../context/LanguageContext';
import content from '../../assets/content.json';
import SummeryCard from './SummaryCard';
import { formatCost } from '../../utils/formatCost';
// Type definitions
type CostType = 'jährlich' | 'einmalig';
type groupIdentifier = 'personalkostenTitel' | 'sicherheitTitel' | 'kommunikationTitel' | 'dienstleistungenTitel' | 'softwareTitel' | 'hardwareTitel';

interface CostInfo {
	groupIdentifier: groupIdentifier;
	costType: CostType;
}

interface Entry extends CostInfo {
	identifier: string;
	value: string;
}

// Function to group entries by a key
function groupBy<T extends Record<string, any>>(entries: T[], key: keyof T): Record<string, T[]> {
	return entries.reduce((result, entry) => {
		const groupKey = entry[key];
		const groupKeyString = String(groupKey);
		(result[groupKeyString] = result[groupKeyString] || []).push(entry);
		return result;
	}, {} as Record<string, T[]>);
}

// Function to calculate total Costs
function calculateTotalCost(entries: Entry[]): string {
	const total = entries.reduce((sum, entry) => {
		// Remove any non-numeric characters (e.g., currency symbols)
		const valueString = entry?.value?.replace(/[^\d.-]/g, '');
		const value = parseFloat(valueString);
		return sum + (isNaN(value) ? 0 : value);
	}, 0);

	return total.toString();
}

// Helper function to render grouped entries
const renderGroups = (groups: Record<string, Entry[]>) => {
	return Object.entries(groups).map(([groupIdentifier, groupEntries]) => (
		<React.Fragment key={groupIdentifier}>
			<div className="flex flex-col gap-1 mb-3">
				<TableEntry identifier={groupIdentifier} variant="header" />
				<div className="flex flex-col gap-2">
					{groupEntries.map((entry) => (
						<TableEntry key={entry.identifier} identifier={entry.identifier} variant="entry" value={formatCost(entry.value)} />
					))}
				</div>
			</div>
		</React.Fragment>
	));
};

interface TableProps {
	identifiers: string[];
	values: string[];
}

const Table: React.FC<TableProps> = ({ identifiers, values }) => {
	const { language } = useLanguage();

	const ComponentContent = (content as languageContentType)[language as keyof typeof content].table;

	console.log(identifiers);
	// Step 1: Process the identifiers
	const entries: Entry[] = identifiers
		.map((identifier, index) => {
			const costInfo = classifyOutput(identifier);
			const value = values[index]; // Get the corresponding value
			return costInfo ? { identifier, value, ...costInfo } : null;
		})
		.filter((entry): entry is Entry => entry !== null); // Type guard to filter out nulls

	// Step 2: Separate by cost type
	const yearlyEntries = entries.filter((entry) => entry.costType === 'jährlich');
	const onceEntries = entries.filter((entry) => entry.costType === 'einmalig');

	const totalYearlyCost = calculateTotalCost(yearlyEntries);
	const totalOnceCost = calculateTotalCost(onceEntries);

	// Step 3: Group by groupIdentifier
	const yearlyGroups = groupBy<Entry>(yearlyEntries, 'groupIdentifier');
	const onceGroups = groupBy<Entry>(onceEntries, 'groupIdentifier');

	return (
		<div className="h-full w-full">
			<div className="pb-6">
				<SummeryCard totalYearlyCost={formatCost(totalYearlyCost)} totalOnceCost={formatCost(totalOnceCost)} />
			</div>
			<div className="flex flex-row items-start justify-center lg:flex-col gap-16 lg:gap-6 rounded-xl w-full">
				{/* Render "jährlich" section */}
				{yearlyEntries.length > 0 && (
					<div id="tableYearly" className="flex flex-col bg-gray-100 py-8 px-4 justify-start rounded-xl w-1/2 lg:w-full">
						<div className="font-semibold text-2xl text-center sm:text-start mb-2 pb-2 border-b border-black">{ComponentContent.yearlyLabel}</div>
						{renderGroups(yearlyGroups)}
						<TableEntry identifier={'yearlyTotal'} variant={'yearlyTotal'} value={formatCost(totalYearlyCost)} />
					</div>
				)}

				{/* Render "einmalig" section */}
				{onceEntries.length > 0 && (
					<div id="tableOnce" className="flex flex-col bg-gray-100 py-8 px-4 justify-start  rounded-xl w-1/2 lg:w-full">
						<div className="font-semibold text-2xl text-center sm:text-start mb-2 pb-2 border-b border-black">{ComponentContent.oneTimeLabel}</div>
						{renderGroups(onceGroups)}
						<TableEntry identifier={'onceTotal'} variant={'onceTotal'} value={formatCost(totalOnceCost)} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Table;
