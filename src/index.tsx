/**
 * Focus looping component based on focus bounders.
 */

import React, { useEffect, useCallback, createRef, CSSProperties } from "react";
import {FocusBounderProps} from "../index";

/** A CSS class name for the bounding elements. */
const BOUNDER_LINK_CLASS_NAME = "FocusBounder-link";

/**
 * A CSS selectors for all focusable elements.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/:not
 */
const FOCUSABLE_ELEMENTS_SELECTORS = [
  // Links must have `href` attribute to be focusable.
  `a[href]:not(.${BOUNDER_LINK_CLASS_NAME}):not([disabled])`,
  // All items with `tabIndex` are focusable but must be >=0
  "[tabindex]:not([tabindex="-1"]):not([disabled])",
  "[contenteditable]",
  // Form elements:
  "button:not([disabled]), input:not([disabled])",
  "select:not([disabled]), textarea:not([disabled])",
];

/**
 * A CSS default styles for the bounding elements.
 */
const FOCUS_BOUNDER_STYLES: CSSProperties = {
  color: "transparent",
  opacity: 0,
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
};

/**
 * Renders `<FocusBounder />` component.
 * @param {!Object} props A component properties object.
 * @param {!React.ReactNode} props.children Child nodes to be wrapped.
 * @param {number=} props.firstElementIndex An optional index of the first focusable element.
 * @param {number=} props.focusTimeoutDelay An optional timeout to wait for the element to be fully visible.
 * @param {boolean=} props.isEnabled An optional property to enable or disable this component functionality.
 */
const FocusBounder = ({
  children,
  firstElementIndex = 0,
  focusTimeoutDelay = 0,
  isEnabled = true,
}: FocusBounderProps) => {
  /**
   * A reference to the first of the two bounding elements.
   */
  const focusBounder = createRef<HTMLAnchorElement>();

  /**
   * Sets focus to the first or last focusable element, depending on the
   * passed index.  Wrapped in a `useCallback` hook to use this function
   * as a dependency on `useEffect` to avoid re-rendering.
   * @param {number} index An index to get the focusable element. A negative
   *   value will count the index from the end. (length + -index).
   */
  const setFocus = useCallback(
    (index: number) => {
      if (isEnabled && focusBounder.current) {
        // Getting the container element containing bounders.
        const container = focusBounder.current.parentNode;
        // Getting all focusable elements in the boudered container.
        const focusable = container?.querySelectorAll<HTMLAnchorElement>(
          FOCUSABLE_ELEMENTS_SELECTORS.join(",")
        );
        // Getting the first or last focusable element, depending on the passed index.
        const element = focusable[index < 0 ? focusable.length + index : index];

        if (element) {
          element.focus();

          // Added timeout to wait for the element to be fully visible.
          if (focusTimeoutDelay && document.activeElement !== element) {
            setTimeout(() => element.focus(), focusTimeoutDelay);
          }
        }
      }
    },
    [isEnabled, focusBounder, focusTimeoutDelay]
  );

  // Setting focus to the first focusable element.
  useEffect(() => setFocus(firstElementIndex), [setFocus, firstElementIndex]);

  return (
    <>
      <a
        ref={focusBounder}
        href="#bounder"
        onFocus={() => setFocus(-1)}
        className={BOUNDER_LINK_CLASS_NAME}
        style={FOCUS_BOUNDER_STYLES}
        aria-hidden="true"
        rel="nofollow"
      >
        &nbsp;
      </a>
      {children}
      <a
        href="#bounder"
        onFocus={() => setFocus(0)}
        className={BOUNDER_LINK_CLASS_NAME}
        style={FOCUS_BOUNDER_STYLES}
        aria-hidden="true"
        rel="nofollow"
      >
        &nbsp;
      </a>
    </>
  );
};

export default FocusBounder;
