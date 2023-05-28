import propz from 'propz';

export function getContactToAdd(contact) {
  const id = propz.get(contact, ['chatId']);
  const name = propz.get(contact, ['name'], '');

  return {
    name,
    id,
    archive: false,
    ephemeralExpiration: 0,
    ephemeralSettingTimestamp: 0,
    notSpam: false
  };
}
