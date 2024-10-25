import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import GrouTitel from './GroupTitel';
import { FaPeopleGroup, FaShieldHalved, FaHandshakeSimple, FaKey } from 'react-icons/fa6';
import { IoChatbubbles, IoHardwareChip } from 'react-icons/io5';

import { useLanguage } from '../../context/LanguageContext';
import content from '../../assets/content.json';

interface OutputCardProps {
	setSelectedList: React.Dispatch<React.SetStateAction<string[]>>;
	selectedList: string[];
}

const OutputCard = ({ setSelectedList, selectedList }: OutputCardProps) => {
	const [tooManySelected, setTooManySelected] = useState<boolean>(false);
	const [classesForAlert, setClassesForAlert] = useState('');
	const { language } = useLanguage();

	const ComponentContent = (content as any)[language as keyof typeof content].outputPage;

	const stateProps = {
		selectedList,
		setSelectedList,
		tooManySelected,
		setTooManySelected,
	};

	useEffect(() => {
		if (tooManySelected) {
			setClassesForAlert('bg-red-600 transform scale-105 text-red-100 duration-100');

			const timeoutId = setTimeout(() => {
				setTooManySelected(false);
				setClassesForAlert('bg-red-200');
			}, 1000);

			// Cleanup function in case component unmounts before timeout completes
			return () => clearTimeout(timeoutId);
		} else if (selectedList.length === 8) {
			setClassesForAlert('bg-orange-600 text-orange-50');
		} else {
			setClassesForAlert('');
		}
	}, [tooManySelected, selectedList]);

	return (
		<div className="flex flex-col gap-6 items-center xl:w-full ">
			<div className={`flex flex-row text-white w-fit text-lg justify-center items-center px-4 py-1 rounded-xl bg-primary ${classesForAlert}`}>
				<span className={`font-semibold`}>
					{/* Dynamically render the selected message based on language */}
					{ComponentContent.selectedMessage?.replace('{count}', selectedList.length.toString())}
				</span>
			</div>
			<div className="grid grid-cols-2 xl:grid-cols-1 gap-24 xl:gap-8 bg-gray-50 w-full p-8  sm:p-2 rounded-xl">
				{/* Column 1 */}
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-2">
						<GrouTitel titel={ComponentContent.personnelCosts} icon={<FaPeopleGroup />} />
						<Checkbox tag="jahrlich" identifier="ITsupport" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="ITMitarbeitende" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="SchulungenSoftware" {...stateProps} />
						<Checkbox tag="einmalig" identifier="SchulungMitarbeitende" {...stateProps} line={false} />
					</div>
					<div className="flex flex-col gap-2">
						<GrouTitel titel={ComponentContent.securityAndPrivacy} icon={<FaShieldHalved />} />
						<Checkbox tag="jahrlich" identifier="Datensicherheit" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="HostedDataStorage" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="SichererDatenaustausch" {...stateProps} line={false} />
					</div>
					<div className="flex flex-col gap-2">
						<GrouTitel titel={ComponentContent.communicationCollaboration} icon={<IoChatbubbles />} />
						<Checkbox tag="jahrlich" identifier="VideoKonferenzen" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="SocialMedia" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="ChatExtern" {...stateProps} line={false} />
					</div>
					<div className="flex flex-col gap-2">
						<GrouTitel titel={ComponentContent.externalServices} icon={<FaHandshakeSimple />} />
						<Checkbox tag="einmalig" identifier="ExterneITBeratung" {...stateProps} />
						<Checkbox tag="einmalig" identifier="ExterneEntwicklung" {...stateProps} />
						<Checkbox tag="einmalig" identifier="Datenmigration" {...stateProps} line={false} />
					</div>
				</div>

				{/* Column 2 */}
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-2">
						<GrouTitel titel={ComponentContent.softwareLicenses} icon={<FaKey />} />
						<Checkbox tag="jahrlich" identifier="SoftwareKosten" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="Kanzleisoftware" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="CRMSoftware" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="ChatInternEmployees" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="DigitaleSignatur" {...stateProps} />
						<Checkbox tag="einmalig" identifier="Systemintegration" {...stateProps} />
						<Checkbox tag="einmalig" identifier="EinmaligerSoftwareKauf" {...stateProps} line={false} />
					</div>
					<div className="flex flex-col gap-2">
						<GrouTitel titel={ComponentContent.hardwareInfrastructure} icon={<IoHardwareChip />} />
						<Checkbox tag="jahrlich" identifier="InformatikKosten" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="DruckerScanner" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="Videokonferenzsystem" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="Laptops" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="ServerNetzwerk" {...stateProps} />
						<Checkbox tag="jahrlich" identifier="InternetMobile" {...stateProps} />
						<Checkbox tag="einmalig" identifier="EinmaligerHardwareKauf" {...stateProps} line={false} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default OutputCard;
