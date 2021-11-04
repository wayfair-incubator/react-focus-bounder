/**
 * Focus looping component based on focus bounders.
 */

import React, { useEffect, useCallback, createRef, FocusEvent } from "react";
import "./index.css";

/** A CSS class name for the bounding elements. */
const BOUNDER_LINK_CLASS_NAME = "FocusBounder-link";

/** 
 * A CSS selectors for all focusable elements.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/:not
 */
const FOCUSABLE_ELEMENTS_SELECTORS = [
  `a:not(.${BOUNDER_LINK_CLASS_NAME}):not([disabled])`,
  "button:not([disabled]), input:not([disabled])",
  "select:not([disabled]), textarea:not([disabled])",
];

type FocusBounderProps = {
  children: React.ReactNode;
  firstElementIndex?: number;
  focusTimeoutDelay?: number;
};

/**
 * Renders `<FocusBounder />` component.
 * @param {!Object} props A component properties object.
 * @param {!React.ReactNode} props.children Child nodes to be wrapped.
 * @param {number=} props.firstElementIndex An optional index of the first focusable element.
 * @param {number=} props.focusTimeoutDelay An optional timeout to wait for the element to be fully visible.
 */
const FocusBounder = ({
  children,
  firstElementIndex = 0,
  focusTimeoutDelay = 0,
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
      if (focusBounder.current) {
        // Getting the container element containing bounders.
        const container = focusBounder.current.parentNode;
        // Getting all focusable elements in the boudered container.
        const focusable = container!.querySelectorAll<HTMLAnchorElement>(
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
    [focusBounder, focusTimeoutDelay]
  );

  /**
   * Handles `focus` events for both bounding elements.
   * @param {!FocusEvent} event The focus event object.
   */
  const onFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    // If the currently focused element is the first bounder, setting the
    // index to -1 to set focus to the last focusable element, otherwise,
    // setting the index to 0 to set focus to the first focusable element.
    const index = event.target === focusBounder.current ? -1 : 0;
    setFocus(index);
  };

  // Setting focus to the first focusable element.
  useEffect(() => setFocus(firstElementIndex), [setFocus, firstElementIndex]);

  return (
    <>
      <a
        ref={focusBounder}
        href="#bounder"
        onFocus={onFocus}
        className={BOUNDER_LINK_CLASS_NAME}
        aria-hidden="true"
        rel="nofollow"
      >
        &nbsp;
      </a>
      {children}
      <a
        href="#bounder"
        onFocus={onFocus}
        className={BOUNDER_LINK_CLASS_NAME}
        aria-hidden="true"
        rel="nofollow"
      >
        &nbsp;
      </a>
    </>
  );
};

export default FocusBounder;
