import { css } from 'styled-components';

interface MediaQueryProps {
  [key: string]: string;
}

interface MediaQueryValues {
  [key: string]: number;
}

const breakpoints: MediaQueryProps = {
  smallMobile: '400px',
  mobile: '600px',
  tablet: '970px',
  laptop: '1140px',
  middleLaptop: '1400px',
  largeLaptop: '1700px',
};

export const breakpointValues: MediaQueryValues = {
  smallMobile: 400,
  mobile: 600,
  tablet: 970,
  laptop: 1140,
  middleLaptop: 1400,
  largeLaptop: 1700,
};

export const breakpoint = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args: Array<string[]>) => {
      return css`
        @media (max-width: ${breakpoints[label]}) {
          ${css({}, ...args)};
        }
      `;
    };
    return accumulator;
  },
  {
    smallMobile: undefined,
    mobile: undefined,
    tablet: undefined,
    laptop: undefined,
    middleLaptop: undefined,
    largeLaptop: undefined,
  }
);

// How to use
// export const ExampleComponent = styled.div`
//   background-color: lime;

//   ${breakpoint.mobile`
//     background-color: red;
//   `}
// `;
