#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const baseDir = process.cwd();
const args = process.argv.slice(2);

console.log('fast create cli startup...\n');
if (args.length < 2) {
  console.warn('example:\n$ fcc projName binName1 binName2');
  return;
}

const binContent = `#!/usr/bin/env node

const args = process.argv.slice(2);
console.log('process args %s', args);

`;

const pkg = {
  name: args[0],
  version: '1.0.0',
  bin: {},
  description: '',
  main: '',
  scripts: {},
  repository: {
    type: 'git',
    url: '',
  },
  author: '',
}

fs.mkdirSync(path.join(baseDir, 'bin'));

const binNameList = args.slice(1);
binNameList.forEach(binName => {
  const binPath = './bin/' + binName + '.js';

  fs.writeFileSync(path.join(baseDir, binPath), binContent);
  // $ chmod +x filepath
  // 给文件加 可执行权限
  fs.chmodSync(binPath, 0o755);

  // write package bin keyword
  pkg.bin[binName] = binPath;
});

fs.writeFileSync(`${baseDir}/package.json`, JSON.stringify(pkg, null, 2));

console.log('fast create cli end.');
