export const resetCss = `
  <style>
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, pre, a, img, small, 
    strong, b, u, i, ol, ul, li, article, footer, header
    {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
      text-decoration: none;
      color: inherit;
    }
    body { line-height: 1; }
    ol, ul { list-style: none; }
  </style>
`;

export const typography = `
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap" rel="stylesheet">
  <style>
    html {
      font-family: 'Roboto', sans-serif;
    }

    .normal {
      font-weight: 400; 
    }

    .heavy {
      font-weight: 900;
    }

    .fs1 {
      font-size: 10px; 
    }

    .fs2 {
      font-size: 16px; 
    }

    .fs3 {
      font-size: 20px; 
    }

    .fs4 {
      font-size: 26px; 
    }

    h1, h2, h3, h4, h5, h6, footer {
      margin-top: 16px
    }
  </style>
`;

export const colors = `
  <style>
    .dark {
      color: hsl(202, 57%, 15%);
    }

    .grey {
      color: hsl(201, 23%, 34%);
    }

    .greyish {
      color: hsl(203, 15%, 47%);
    }
  </style>
`;
