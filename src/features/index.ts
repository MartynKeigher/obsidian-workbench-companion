import type { Feature } from '../feature';
import { createPopColorFeature } from './pop-color';

// Every feature, in the order its setting appears within its section.
export function createFeatures(): Feature[] {
  return [createPopColorFeature()];
}
