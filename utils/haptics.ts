import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";

// Toggled by the user's "Haptic feedback" setting. Defaults on; the settings
// provider syncs the persisted value on launch.
let hapticsEnabled = true;

export const setHapticsEnabled = (value: boolean) => {
  hapticsEnabled = value;
};

export const triggerHaptic = () => {
  if (hapticsEnabled) {
    impactAsync(ImpactFeedbackStyle.Light);
  }
};

// A firmer cue for when the brew advances to a new step, so it's felt
// without looking at the screen mid-pour.
export const triggerStepHaptic = () => {
  if (hapticsEnabled) {
    impactAsync(ImpactFeedbackStyle.Medium);
  }
};
