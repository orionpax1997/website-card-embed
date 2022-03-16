import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'CEYY';
        font-style: normal;
        font-weight: normal;
        src: url('仓耳渔阳体W02.woff2') format("woff2");
      }
      `}
  />
);

export default Fonts;
