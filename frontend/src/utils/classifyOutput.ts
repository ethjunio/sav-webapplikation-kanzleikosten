type CostType = 'jährlich' | 'einmalig';
type groupIdentifier =
  | 'personalkostenTitel'
  | 'sicherheitTitel'
  | 'kommunikationTitel'
  | 'dienstleistungenTitel'
  | 'softwareTitel'
  | 'hardwareTitel';

interface CostInfo {
  groupIdentifier: groupIdentifier;
  costType: CostType;
}

function classifyOutput(identifier: string): CostInfo | null {
  const mapping: Record<string, CostInfo> = {
    ITsupport: { groupIdentifier: 'personalkostenTitel', costType: 'jährlich' },
    ITMitarbeitende: {
      groupIdentifier: 'personalkostenTitel',
      costType: 'jährlich',
    },
    SchulungenSoftware: {
      groupIdentifier: 'personalkostenTitel',
      costType: 'jährlich',
    },
    SchulungMitarbeitende: {
      groupIdentifier: 'personalkostenTitel',
      costType: 'einmalig',
    },
    Datensicherheit: {
      groupIdentifier: 'sicherheitTitel',
      costType: 'jährlich',
    },
    HostedDataStorage: {
      groupIdentifier: 'sicherheitTitel',
      costType: 'jährlich',
    },
    SichererDatenaustausch: {
      groupIdentifier: 'sicherheitTitel',
      costType: 'jährlich',
    },
    VideoKonferenzen: {
      groupIdentifier: 'kommunikationTitel',
      costType: 'jährlich',
    },
    SocialMedia: {
      groupIdentifier: 'kommunikationTitel',
      costType: 'jährlich',
    },
    ChatExtern: { groupIdentifier: 'kommunikationTitel', costType: 'jährlich' },
    ChatIntern: { groupIdentifier: 'kommunikationTitel', costType: 'jährlich' },
    ExterneITBeratung: {
      groupIdentifier: 'dienstleistungenTitel',
      costType: 'einmalig',
    },
    ExterneEntwicklung: {
      groupIdentifier: 'dienstleistungenTitel',
      costType: 'einmalig',
    },
    Datenmigration: {
      groupIdentifier: 'dienstleistungenTitel',
      costType: 'einmalig',
    },
    SoftwareKosten: { groupIdentifier: 'softwareTitel', costType: 'jährlich' },
    Kanzleisoftware: { groupIdentifier: 'softwareTitel', costType: 'jährlich' },
    CRMSoftware: { groupIdentifier: 'softwareTitel', costType: 'jährlich' },
    ChatExternClients: {
      groupIdentifier: 'softwareTitel',
      costType: 'jährlich',
    },
    ChatInternEmployees: {
      groupIdentifier: 'softwareTitel',
      costType: 'jährlich',
    },
    DigitaleSignatur: {
      groupIdentifier: 'softwareTitel',
      costType: 'jährlich',
    },
    Systemintegration: {
      groupIdentifier: 'softwareTitel',
      costType: 'einmalig',
    },
    EinmaligerSoftwareKauf: {
      groupIdentifier: 'softwareTitel',
      costType: 'einmalig',
    },
    InformatikKosten: {
      groupIdentifier: 'hardwareTitel',
      costType: 'jährlich',
    },
    DruckerScanner: { groupIdentifier: 'hardwareTitel', costType: 'jährlich' },
    Videokonferenzsystem: {
      groupIdentifier: 'hardwareTitel',
      costType: 'jährlich',
    },
    Laptops: { groupIdentifier: 'hardwareTitel', costType: 'jährlich' },
    ServerNetzwerk: { groupIdentifier: 'hardwareTitel', costType: 'jährlich' },
    InternetMobile: { groupIdentifier: 'hardwareTitel', costType: 'jährlich' },
    EinmaligerHardwareKauf: {
      groupIdentifier: 'hardwareTitel',
      costType: 'einmalig',
    },
  };

  return mapping[identifier] || null;
}

export default classifyOutput;
