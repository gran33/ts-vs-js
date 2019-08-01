const _ = require('lodash');
const exec = require('./exec');


function printWithColor(str) {
    console.log('\x1b[33m%s\x1b[0m', str);
}

function getCount(fileType, suffix = []) {
    const notName = '-not -name';
    let suffixesProcessed = '';
    _.forEach(suffix, (s) => {
        suffixesProcessed += `${notName} "*.${s}.${fileType}" `;
    });
    const count = exec.exec(`find Playground -type f -name "*.${fileType}" ${suffixesProcessed} | wc -l`).toString();
    return _.toNumber(_.trim(count));
}

const tsCount = getCount('ts', ['test', 'e2e']);
const tsxCount = getCount('tsx', ['test', 'e2e']);
const jsCount = getCount('js', ['test', 'e2e']);
const codeBaseFileCount = tsCount + jsCount + tsxCount;

printWithColor('##############################');
printWithColor( 'typescript %: ' + ((tsCount + tsxCount) * 100) / codeBaseFileCount);
printWithColor('# *.ts files:' + tsCount);
printWithColor('# *.tsx files:' + tsxCount);
printWithColor('# *.js files:' + jsCount);
printWithColor('##############################');
