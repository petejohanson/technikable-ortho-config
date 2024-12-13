const fs = require('fs');
const yaml = require('js-yaml');

const filePath = './keymap-drawer/technikable.svg';
const svgStr = fs.readFileSync('./keymap-drawer/technikable.svg').toString();
const cssStr = fs.readFileSync('./keymap-colorize/styles.css').toString();

const newSvgStr = svgStr
  .split('\n').join('')
  .replace(/(<g transform="translate\([0-9]*, [0-9]*\)" class="key keypos-[0-9]*">(.*?)<\/g>)/g, (match, p1, p2) => {
    const keys = [];

    p2.replace(/<text x="0" y="0" class="key tap">(.*)<\/text>/gm, (match, pp1) => {
      if (pp1.length === 1) keys.push(pp1);
    })

    return p1.replace('<g transform', `<g data-key="${keys[0]}" transform`);
  })
  .replace('</style>', `${cssStr}</style>`)
  .replace('</style>', `</style><link rel="stylesheet" href="../colorize-keys.css" />`)

fs.writeFileSync(filePath.replace('.svg', '-new.svg'), newSvgStr);
