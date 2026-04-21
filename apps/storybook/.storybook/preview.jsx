import React, { useEffect } from 'react';
import '@atomchat.io/tokens/build/css/tokens.css';
import '@atomchat.io/css/dist/fonts.css';
import '@atomchat.io/css/dist/atom.css';

import {
  initRotateClones,
  initRotateCalc,
  initHoverRotate,
  initCardHover,
} from '@atomchat.io/animations/hover';

import {
  initFormValidation,
  initCounterOdometer,
} from '@atomchat.io/animations/components/forms';

import { initPaginationOdometer } from '@atomchat.io/animations/components/navigation';
import { initAccordion, initSegmentIndicator } from '@atomchat.io/animations/components/containers';
import { initModal } from '@atomchat.io/animations/components/feedback/modal';
import { initNumberOdometer } from '@atomchat.io/animations/effects/text/odometer';
import { initMarqueeObserver } from '@atomchat.io/animations/marketing/marquee';

// Store odometer updater for programmatic number changes (Badge story)
let updateOdometer = null;

// Counter + pagination observers — reconnected once per story (not per render)
let cleanupCounter = null;
let cleanupPagination = null;

window.__atomInit = function (scope) {
  if (!scope) scope = document;
  requestAnimationFrame(() => {
    initRotateClones();
    initRotateCalc();
    initHoverRotate();
    initCardHover();
    initAccordion({ scope });
    initSegmentIndicator({ scope });
    initModal({ scope });
    updateOdometer = initNumberOdometer();
    initMarqueeObserver({ scope });
  });
};

// Called once when a story mounts — sets up MutationObserver-based odometers.
// Separated from __atomInit so rapid re-renders don't disconnect/reconnect observers.
window.__atomInitObservers = function (scope) {
  if (!scope) scope = document;
  if (cleanupCounter) cleanupCounter();
  if (cleanupPagination) cleanupPagination();
  cleanupCounter    = initCounterOdometer({ scope });
  cleanupPagination = initPaginationOdometer({ scope });
};

window.__atomUpdateOdometer = function (el, newText, opts) {
  if (updateOdometer) updateOdometer(el, newText, opts);
};

// React decorator
function withAnimations(Story) {
  // Runs after every render — hover, modal, scroll animations
  useEffect(() => {
    window.__atomInit();
  });

  // Runs once on mount — MutationObserver-based odometers (counter, pagination)
  useEffect(() => {
    window.__atomInitObservers();
  }, []);

  return <Story />;
}

/** @type {import('@storybook/react').Preview} */
const preview = {
  decorators: [withAnimations],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'surface', value: '#f9fafb' },
        { name: 'dark', value: '#0f0f0f' },
      ],
    },
  },
};

export default preview;
