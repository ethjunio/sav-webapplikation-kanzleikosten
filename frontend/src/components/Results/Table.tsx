import TableEntry from './TableEntry';
import { FaKey } from 'react-icons/fa';
import classifyOutput from '../../utils/classifyOutput';
import React from 'react';
import { languageContentType } from '../../types/languageContentType';
import { useLanguage } from '../../context/LanguageContext';
import content from '../../assets/content.json';

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

// Helper function to render grouped entries
const renderGroups = (groups: Record<string, Entry[]>) => {
	return Object.entries(groups).map(([groupIdentifier, groupEntries]) => (
		<React.Fragment key={groupIdentifier}>
			<div className="flex flex-col gap-1 mb-3">
				<TableEntry identifier={groupIdentifier} variant="header" />
				<div className="flex flex-col gap-2">
					{groupEntries.map((entry) => (
						<TableEntry key={entry.identifier} identifier={entry.identifier} variant="entry" value={entry.value} />
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

	// Step 3: Group by groupIdentifier
	const yearlyGroups = groupBy<Entry>(yearlyEntries, 'groupIdentifier');
	const onceGroups = groupBy<Entry>(onceEntries, 'groupIdentifier');

	return (
		<div className="flex flex-col gap-4 bg-slate-100 p-8 rounded-xl w-full">
			<div className="flex flex-row items-center justify-between border-b-2 py-2">
				<h3>{ComponentContent.title}</h3>
				<h3>CHF</h3>
			</div>
			{/* Render "jährlich" section */}
			{yearlyEntries.length > 0 && (
				<div className="flex flex-col">
					<div className="font-semibold text-lg mb-2">{ComponentContent.yearlyLabel}</div>
					{renderGroups(yearlyGroups)}
				</div>
			)}
			{/* Render "einmalig" section */}
			{onceEntries.length > 0 && (
				<div className="once-section">
					<div className="font-semibold text-lg mb-2">{ComponentContent.oneTimeLabel}</div>
					{renderGroups(onceGroups)}
				</div>
			)}
		</div>
	);
};

export default Table;
