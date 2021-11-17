# Focus bounder for React

[![OSS Template Version](https://img.shields.io/badge/OSS%20Template-0.3.5-7f187f.svg)](https://github.com/wayfair-incubator/oss-template/blob/main/CHANGELOG.md)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE_OF_CONDUCT.md)
[![Build Status](https://github.com/wayfair-incubator/react-focus-bounder/actions/workflows/build.yml/badge.svg)](https://github.com/wayfair-incubator/react-focus-bounder/actions/workflows/build.yml)
[![NPM version](https://img.shields.io/npm/v/react-focus-bounder.svg?logo=npm)](https://npmjs.org/package/react-focus-bounder)
[![NPM downloads](https://img.shields.io/npm/dm/react-focus-bounder.svg?style=flat)](https://npmjs.org/package/react-focus-bounder)

## About The Project

Focus looping component based on focus bounders.

This small React component will cover one of the important aspects to make a web-page accessible - looping (aka trapping) focus inside a DOM element.

Keyboard navigation is a basic requirement in making any product accessible.
For web pages it can be achieved by combination of semantic HTML, `tabIndex` and `aria` attributes.

Focus looping is an important part of A11Y support.
Good examples where a focus looping component can be used are a hamburger or dropdown menus and modal dialogs.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Be sure you use latest stable version of `npm`:

```sh
npm install npm@latest -g
```

## Usage

```bash
npm install react-focus-bounder
# Or
yarn add react-focus-bounder
```

```js
import FocusBounder from 'react-focus-bounder';

...

<FocusBounder>
  <ul>
    <li><a href="/">link</a></li>
    <li><button>button</button></li>
    <li><input value="input" /></li>
    <li><select><option>option</option></select></li>
  </ul>
</FocusBounder>
```

## Component props

- `firstElementIndex` - An optional index of the first focusable element. Default `0`.
- `focusTimeoutDelay` - An optional timeout to wait for the element to be fully visible. Default `0`.
- `isEnabled` - An optional property to enable or disable this component functionality. Default `true`.

## Roadmap

See the [open issues](https://github.com/wayfair-incubator/react-focus-bounder/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. For detailed contributing guidelines, please see [CONTRIBUTING.md](CONTRIBUTING.md)

## License

Distributed under the `MIT License` License. See `LICENSE` for more information.

## Contact

Valentin Podkamennyi - [@vpodk](https://twitter.com/vpodk)

Project Link: [https://github.com/wayfair-incubator/react-focus-bounder](https://github.com/wayfair-incubator/react-focus-bounder)

## Acknowledgements

This template was adapted from
[https://github.com/othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template).
