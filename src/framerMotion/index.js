import { transition1 } from "./transition";

export const viewportFadeUp = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  transition: transition1,
  variants: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  },
};

export const viewportScaleDownFadeUp = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  transition: transition1,
  variants: {
    hidden: { opacity: 0, scale: 1.1, y: 100 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
};

export const viewportScaleDown = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  transition: transition1,
  variants: {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1 },
  },
};

export const viewportSlideRight = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  transition: transition1,
  variants: {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0 },
  },
};
export const viewportSlideLeft = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  transition: transition1,
  variants: {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0 },
  },
};

export const scaleDown = {
  initial: { opacity: 0, scale: 0.02 },
  animate: { opacity: 1, scale: 1 },
  transition: transition1,
};

export const slideDown = {
  initial: { opacity: 0, y: -80 },
  animate: { opacity: 1, y: 0 },
  transition: transition1,
};
export const slideRight = {
  initial: { opacity: 0, x: -80 },
  animate: { opacity: 1, x: 0 },
  transition: transition1,
};

export const slideLeft = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  transition: transition1,
};
