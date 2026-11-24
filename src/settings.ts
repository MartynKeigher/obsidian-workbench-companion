import { isPopColorId, type PopColorId } from './pop-colors';

// Every saved setting. New features add their keys here and in DEFAULT_SETTINGS.
export interface WorkbenchSettings {
  popColor: PopColorId;
}

export const DEFAULT_SETTINGS: Readonly<WorkbenchSettings> = {
  popColor: 'none',
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Merges saved data over the defaults. Keys this version doesn't know are kept,
// so settings saved by a newer version survive; invalid known values are reset.
export function mergeSettings(saved: unknown): WorkbenchSettings {
  const merged: WorkbenchSettings = { ...DEFAULT_SETTINGS, ...(isPlainObject(saved) ? saved : {}) };
  if (!isPopColorId(merged.popColor)) merged.popColor = DEFAULT_SETTINGS.popColor;
  return merged;
}
