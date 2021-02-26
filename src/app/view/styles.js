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
    .underline { text-decoration: underline; }
    .fs1 { font-size: 10px; }
    .fs2 { font-size: 16px; }
    .fs3 { font-size: 20px; }
    .fs4 { font-size: 26px; }  
  </style>
`;

export const colors = `
  <style>
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
    .cl-pr-050 { color: #E0FCFF; }
    .cl-pr-100 { color: #BEF8FD; }
    .cl-pr-200 { color: #87EAF2; }
    .cl-pr-300 { color: #54D1DB; }
    .cl-pr-400 { color: #38BEC9; }
    .cl-pr-500 { color: #2CB1BC; }
    .cl-pr-600 { color: #14919B; }
    .cl-pr-700 { color: #0E7C86; }
    .cl-pr-800 { color: #0A6C74; }
    .cl-pr-900 { color: #044E54; }
    .cl-nt-050 { color: #F0F4F8; }
    .cl-nt-100 { color: #D9E2EC; }
    .cl-nt-200 { color: #BCCCDC; }
    .cl-nt-300 { color: #9FB3C8; }
    .cl-nt-400 { color: #829AB1; }
    .cl-nt-500 { color: #627D98; }
    .cl-nt-600 { color: #486581; }
    .cl-nt-700 { color: #334E68; }
    .cl-nt-800 { color: #243B53; }
    .cl-nt-900 { color: #102A43; }
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
    .mr1 { margin-right: 8px; }
    .mr2 { margin-right: 16px; }
    .mr3 { margin-right: 32px; }
    .mb1 { margin-bottom: 8px; }
    .mb2 { margin-bottom: 16px; }
    .mb3 { margin-bottom: 32px; }
    .p1 { padding: 8px; }
    .p2 { padding: 16px; }
    .p3 { padding: 32px; }
    .pl1 { padding-left: 8px; }
    .pl2 { padding-left: 16px; }
    .pl3 { padding-left: 32px; }
    .wm1 { max-width: 576px; }
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
