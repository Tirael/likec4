import { style } from "@vanilla-extract/css";
import { mantine, vars } from "../../theme-vars";

export const btn = style({
  pointerEvents: 'all',
  color: vars.element.loContrast,
  cursor: 'pointer',
  backgroundColor: 'var(--ai-bg)',
  'vars': {
    '--ai-bg-idle': `color-mix(in srgb , ${vars.element.fill},  transparent 99%)`,
    '--ai-bg': `var(--ai-bg-idle)`,
    '--ai-bg-hover': `color-mix(in srgb , ${vars.element.fill} 65%, ${vars.element.stroke})`,
    '--ai-hover': `color-mix(in srgb , ${vars.element.fill} 50%, ${vars.element.stroke})`
  },
  ':hover': {
    boxShadow: mantine.shadows.md
  }
})
