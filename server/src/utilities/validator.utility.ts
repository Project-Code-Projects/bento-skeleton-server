export function validateBulkIds (ids: any) {
  if (!Array.isArray(ids)) return false;
  for (const id of ids) {
    if (typeof id !== 'number') return false;
  }
  return true;
}