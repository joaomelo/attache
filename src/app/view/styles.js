export const baseCss = `
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap" rel="stylesheet">
  <style>
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, pre, a, img, small, 
    strong, b, u, i, ol, ul, li, article, footer, header {
      margin: 0;
      margin-block-start: 0;
      margin-block-end: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
      text-decoration: none;
      color: inherit;
    }

    html { 
      font-family: 'Roboto', sans-serif; 
    }

    body { 
      line-height: 1; 
    }
  </style>
`;

export const text = {
  weight: {
    normal: 'font-weight: 400;',
    heavy: 'font-weight: 900;'
  },
  align: {
    center: 'text-align: center;'
  },
  size: {
    s1: 'font-size: 10px;',
    s2: 'font-size: 16px;',
    s3: 'font-size: 20px;',
    s4: 'font-size: 26px;'
  },
  underline: 'text-decoration: underline;'
};

export const colors = {
  bg: {
    p1: 'background-color: #BEF8FD;',
    p3: 'background-color: #54D1DB;',
    p7: 'background-color: #0E7C86;',
    p9: 'background-color: #044E54;',
    n1: 'background-color: #D9E2EC;',
    n3: 'background-color: #9FB3C8;',
    n7: 'background-color: #334E68;',
    n9: 'background-color: #102A43;'
  },
  cl: {
    p1: 'color: #BEF8FD;',
    p3: 'color: #54D1DB;',
    p4: 'color: #38BEC9;',
    p7: 'color: #0E7C86;',
    p9: 'color: #044E54;',
    n1: 'color: #D9E2EC;',
    n3: 'color: #9FB3C8;',
    n7: 'color: #334E68;',
    n9: 'color: #102A43;'
  }
};

export const sizes = {
  padding: {
    p1: 'padding: 8px;',
    p2: 'padding: 16px;',
    p3: 'padding: 32px;',
    pl1: 'padding-left: 8px;',
    pl2: 'padding-left: 16px;',
    pl3: 'padding-left: 32px;'
  },
  margin: {
    auto: 'margin: auto;',
    mt1: 'margin-top: 8px;',
    mt2: 'margin-top: 16px;',
    mt3: 'margin-top: 32px;',
    ml1: 'margin-left: 8px;',
    ml2: 'margin-left: 16px;',
    ml3: 'margin-left: 32px;',
    mr1: 'margin-right: 8px;',
    mr2: 'margin-right: 16px;',
    mr3: 'margin-right: 32px;',
    mb1: 'margin-bottom: 8px;',
    mb2: 'margin-bottom: 16px;',
    mb3: 'margin-bottom: 32px;'
  },
  width: {
    max1: 'max-width: 576px;'
  }
};

export const position = {
  flex: 'display: flex;',
  align: {
    center: 'align-items: center;'
  }
};

export const effects = {
  rounded: 'border-radius: 8px;',
  line: 'border-top: 1px solid #BCCCDC;'
};

export function style (...rest) {
  return `style="${rest.join('')}"`;
}
