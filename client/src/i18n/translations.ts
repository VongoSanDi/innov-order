export const keyTranslations: Record<string, string> = {
  'allergens_imported': 'Allergènes',
  'abbreviated_product_name': 'Nom du produit',
  'brands': 'Marques',
  'code': 'Code barre du produit'
};

export function formatKeyName(key: string): string {
  // If the a transalation exist use it
  if (keyTranslations[key]) {
    return keyTranslations[key];
  }

  // else we format it in a standart format
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/([A-Z])/g, ' $1')
    .trim();
}
