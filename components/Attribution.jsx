'use client';
import { useEffect } from 'react';
import { recordVisitorAttribution } from '../lib/attribution';

// Mounted once in the root layout — fires the gclid/UTM capture on every page load.
export default function Attribution() {
  useEffect(() => {
    recordVisitorAttribution();
  }, []);
  return null;
}
