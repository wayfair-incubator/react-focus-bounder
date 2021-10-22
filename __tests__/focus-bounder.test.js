/**
 * FocusBounder component spec.
 */

import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FocusBounder from '../index';

const renderComponent = () =>
  render(
    <div>
      <FocusBounder>
        <a href="#first" id="first-element">
          First element
        </a>
        <button id="second-element">Second element</button>
        <a href="#last" id="last-element">
          Last element
        </a>
      </FocusBounder>
    </div>
  );

describe('FocusBounder', () => {
  it('should loop focus between the first and last focusable elements', () => {
    renderComponent();

    // Testing setting focus to the first focusable element on a first render.
    expect(document.activeElement.id).toBe('first-element');

    // Testing setting focus to the second focusable element when tab is pressed.
    userEvent.tab();
    expect(document.activeElement.id).toBe('second-element');

    // Testing setting focus to the last focusable element when tab is pressed.
    userEvent.tab();
    expect(document.activeElement.id).toBe('last-element');

    // Testing setting focus to the first focusable element when tab is pressed.
    userEvent.tab();
    expect(document.activeElement.id).toBe('first-element');

    // Testing setting focus to the last focusable element when shift+tab is pressed.
    userEvent.tab({shift: true});
    expect(document.activeElement.id).toBe('last-element');

    // Testing setting focus to the second focusable element when shift+tab is pressed.
    userEvent.tab({shift: true});
    expect(document.activeElement.id).toBe('second-element');
  });
});
