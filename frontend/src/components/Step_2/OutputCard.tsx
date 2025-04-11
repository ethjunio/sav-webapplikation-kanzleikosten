import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import Checkbox from './Checkbox';
import GroupTitel from './GroupTitel';
import { FaHandshakeSimple, FaKey, FaPeopleGroup, FaShieldHalved } from 'react-icons/fa6';
import { IoChatbubbles, IoHardwareChip } from 'react-icons/io5';
import { useDictionary } from '@/context/DictionaryContext';
import { useWindowWidth } from '@/context/WindowWidthContext';

interface OutputCardProps {
  setSelectedList: Dispatch<SetStateAction<string[]>>;
  selectedList: string[];
}

const OutputCard = ({ setSelectedList, selectedList }: OutputCardProps) => {
  const [tooManySelected, setTooManySelected] = useState<boolean>(false);
  const [, setClassesForAlert] = useState('');
  const dict = useDictionary();
  const { width } = useWindowWidth();

  const isMobile = useMemo(() => width < 767, [width]);

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
    <div className="flex flex-col gap-6 items-center">
      <div className={`grid gap-24 bg-gray-50 w-full rounded-xl ${isMobile ? 'grid-cols-1 p-2' : 'grid-cols-2 p-8'}`}>
        {/* Column 1 */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <GroupTitel titel={dict.outputPage.personnelCosts} icon={<FaPeopleGroup />} />
            <Checkbox tag="jahrlich" identifier="ITsupport" {...stateProps} />
            <Checkbox tag="jahrlich" identifier="ITMitarbeitende" {...stateProps} />
            <Checkbox tag="jahrlich" identifier="SchulungenSoftware" {...stateProps} />
            <Checkbox tag="einmalig" identifier="SchulungMitarbeitende" {...stateProps} line={false} />
          </div>
          <div className="flex flex-col gap-2">
            <GroupTitel titel={dict.outputPage.securityAndPrivacy} icon={<FaShieldHalved />} />
            <Checkbox tag="jahrlich" identifier="Datensicherheit" {...stateProps} />
            <Checkbox tag="jahrlich" identifier="HostedDataStorage" {...stateProps} />
            <Checkbox tag="jahrlich" identifier="SichererDatenaustausch" {...stateProps} line={false} />
          </div>
          <div className="flex flex-col gap-2">
            <GroupTitel titel={dict.outputPage.communicationCollaboration} icon={<IoChatbubbles />} />
            <Checkbox tag="jahrlich" identifier="VideoKonferenzen" {...stateProps} />
            <Checkbox tag="jahrlich" identifier="SocialMedia" {...stateProps} />
            <Checkbox tag="jahrlich" identifier="ChatExtern" {...stateProps} line={false} />
          </div>
          <div className="flex flex-col gap-2">
            <GroupTitel titel={dict.outputPage.externalServices} icon={<FaHandshakeSimple />} />
            <Checkbox tag="einmalig" identifier="ExterneITBeratung" {...stateProps} />
            <Checkbox tag="einmalig" identifier="ExterneEntwicklung" {...stateProps} />
            <Checkbox tag="einmalig" identifier="Datenmigration" {...stateProps} line={false} />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <GroupTitel titel={dict.outputPage.softwareLicenses} icon={<FaKey />} />
            <Checkbox tag="jahrlich" identifier="SoftwareKosten" {...stateProps} />
            <Checkbox tag="jahrlich" identifier="Kanzleisoftware" {...stateProps} />
            <Checkbox tag="jahrlich" identifier="CRMSoftware" {...stateProps} />
            <Checkbox tag="jahrlich" identifier="ChatInternEmployees" {...stateProps} />
            <Checkbox tag="jahrlich" identifier="DigitaleSignatur" {...stateProps} />
            <Checkbox tag="einmalig" identifier="Systemintegration" {...stateProps} />
            <Checkbox tag="einmalig" identifier="EinmaligerSoftwareKauf" {...stateProps} line={false} />
          </div>
          <div className="flex flex-col gap-2">
            <GroupTitel titel={dict.outputPage.hardwareInfrastructure} icon={<IoHardwareChip />} />
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
