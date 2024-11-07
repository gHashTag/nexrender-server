import { render } from '@nexrender/core';

import myjob from './myjob.json';

console.log('AERENDER_BINARY:', process.env.AERENDER_BINARY);

const main = async () => {
    const binaryPath = process.env.AERENDER_BINARY;
    console.log(binaryPath, 'binaryPath');
    if (!binaryPath) {
        return Promise.reject(new Error('You should provide a proper path to After Effects\' "aerender" binary'));
    }

    const result = await render(
        myjob, {
        binary: binaryPath
    });

    console.log('Render finished:', result);
    
    return result;
};

main().catch(console.error);