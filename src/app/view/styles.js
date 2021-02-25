export const resetCss = `
  <style>
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, pre, a, img, small, 
    strong, b, u, i, ol, ul, li, article, footer, header
    {
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
    body { line-height: 1; }
    ol, ul { list-style: none; }
  </style>
`;

export const typography = `
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap" rel="stylesheet">
  <style>
    html { font-family: 'Roboto', sans-serif; }
    .normal { font-weight: 400; }
    .heavy { font-weight: 900; }
    .text-center { text-align: center; }
    .fs1 { font-size: 10px; }
    .fs2 { font-size: 16px; }
    .fs3 { font-size: 20px; }
    .fs4 { font-size: 26px; }  
  </style>
`;

export const colors = `
  <style>
    .dark { color: hsl(202, 57%, 15%); }
    .grey { color: hsl(201, 23%, 34%); }
    .greyish { color: hsl(203, 15%, 47%); }
    .bg-pr-050 { background-color: #E0FCFF; }
    .bg-pr-100 { background-color: #BEF8FD; }
    .bg-pr-200 { background-color: #87EAF2; }
    .bg-pr-300 { background-color: #54D1DB; }
    .bg-pr-400 { background-color: #38BEC9; }
    .bg-pr-500 { background-color: #2CB1BC; }
    .bg-pr-600 { background-color: #14919B; }
    .bg-pr-700 { background-color: #0E7C86; }
    .bg-pr-800 { background-color: #0A6C74; }
    .bg-pr-900 { background-color: #044E54; }
    .bg-nt-050 { background-color: #F0F4F8; }
    .bg-nt-100 { background-color: #D9E2EC; }
    .bg-nt-200 { background-color: #BCCCDC; }
    .bg-nt-300 { background-color: #9FB3C8; }
    .bg-nt-400 { background-color: #829AB1; }
    .bg-nt-500 { background-color: #627D98; }
    .bg-nt-600 { background-color: #486581; }
    .bg-nt-700 { background-color: #334E68; }
    .bg-nt-800 { background-color: #243B53; }
    .bg-nt-900 { background-color: #102A43; }
  </style>
`;

export const sizing = `
  <style>
    .mauto { margin: auto; }
    .mt1 { margin-top: 8px; }
    .mt2 { margin-top: 16px; }
    .mt3 { margin-top: 32px; }
    .ml1 { margin-left: 8px; }
    .ml2 { margin-left: 16px; }
    .ml3 { margin-left: 32px; }

    .p1 {
      padding: 8px;
    }

    .p2 {
      padding: 16px;
    }

    .p3 {
      padding: 32px;
    }

    .mw1 {
      max-width: 576px;
    }
  </style>
`;

export const position = `
  <style>
    .flex { display: flex; }
    .align-center { align-items: center; }
  </style>
`;

export const effects = `
  <style>
    .rounded { border-radius: 8px; }
  </style>
`;
