import React from "react";

export interface FocusBounderProps {
  children: React.ReactNode;
  firstElementIndex?: number;
  focusTimeoutDelay?: number;
  isEnabled?: boolean;
}

declare const FocusBounder: React.FunctionComponent<FocusBounderProps>;

export default FocusBounder;
