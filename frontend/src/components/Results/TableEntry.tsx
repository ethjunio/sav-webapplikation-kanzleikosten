import { FaPeopleGroup, FaShieldHalved, FaHandshakeSimple, FaKey } from 'react-icons/fa6';
import { IoChatbubbles, IoHardwareChip } from 'react-icons/io5';
import content from '../../assets/content.json';
import { languageContentType } from '../../types/languageContentType';
import { useLanguage } from '../../context/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
	personalkostenTitel: <FaPeopleGroup />,
	sicherheitTitel: <FaShieldHalved />,
	kommunikationTitel: <FaHandshakeSimple />,
	dienstleistungenTitel: <FaKey />,
	softwareTitel: <IoChatbubbles />,
	hardwareTitel: <IoHardwareChip />,
};

interface TableEntryProps {
	identifier: string;
	value?: string;
	variant?: string;
}

const TableEntry: React.FC<TableEntryProps> = ({ identifier, value, variant }) => {
	const { language } = useLanguage();

	const ComponentContent = (content as languageContentType)[language as keyof typeof content].checkboxLabels;

	let variantClass;
	switch (variant) {
		case 'header':
			variantClass = 'uppercase text-m text-gray-400 px-4';
			break;
		case 'yearlyTotal':
			variantClass = 'text-xl font-medium pt-2 border-t border-black';
			break;
		case 'onceTotal':
			variantClass = 'text-xl font-medium  pt-2 border-t border-black';
			break;
		default:
			variantClass = 'ps-8 pe-4 text-lg';
	}

	let icon;
	if (variant == 'header') {
		icon = iconMap[identifier];
	}
	
	return (
		<div className={`flex flex-row justify-between items-center w-full ${variantClass}`}>
			<div className="flex flex-row items-center gap-2">
				{icon && icon} {ComponentContent[identifier]}
			</div>
			<div className="font-medium text-lg">{value}</div>
		</div>
	);
};

export default TableEntry;
