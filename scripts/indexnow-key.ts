import fs from 'node:fs';
const key=process.env.INDEXNOW_KEY;if(!key||!/^[a-zA-Z0-9-]{8,128}$/.test(key))throw Error('Set INDEXNOW_KEY (8–128 letters, digits or hyphens).');fs.writeFileSync(`public/${key}.txt`,key);console.log('IndexNow public verification file created; rebuild and deploy before submitting.');
