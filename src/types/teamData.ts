export interface TeamName {
  "zh-tw": string;
  en: string;
}

export interface PersonName {
  "zh-tw": string;
  en: string;
}

export interface GeneralManager {
  name: PersonName;
}

export interface Manager {
  id: string;
  name: PersonName;
}

export interface Stadium {
  code: string;
  name: TeamName;
}

export interface Address {
  "zh-tw": string;
  en: string;
}

export interface Contact {
  email: string;
  telephone: string;
  fax: string;
  address: Address;
}

export interface TeamData {
  id: number;
  logo: string;
  name: TeamName;
  generalManager: GeneralManager;
  Manager: Manager;
  stadium: Stadium;
  website: string;
  contact: Contact;
}