export const STAGE_WIDTH = 1180;
export const STAGE_HEIGHT = 820;
export const WIDTH_TARGET = 0.9;

export type StageTransform = {
  scale: number;
  logicalWidth: number;
  rotated: boolean;
};

export function computeStageTransform(
  rect: { width: number; height: number },
  stage: { width: number; height: number },
  shouldRotate: boolean,
): StageTransform {
  if (rect.width === 0 || rect.height === 0) {
    return { scale: 0, logicalWidth: stage.width, rotated: shouldRotate };
  }

  if (shouldRotate) {
    // Rotated -90deg: the fixed logical height maps to the on-screen width,
    // the floored logical width maps to the long (vertical) on-screen axis.
    const baseScale = (WIDTH_TARGET * rect.width) / stage.height;
    const logicalWidth = Math.max(stage.width, rect.height / baseScale);
    const scale = Math.min(baseScale, rect.height / logicalWidth);
    return { scale, logicalWidth, rotated: true };
  }

  const baseScale = rect.height / stage.height;
  const logicalWidth = Math.max(stage.width, (WIDTH_TARGET * rect.width) / baseScale);
  const scale = Math.min(baseScale, (WIDTH_TARGET * rect.width) / logicalWidth);
  return { scale, logicalWidth, rotated: false };
}
