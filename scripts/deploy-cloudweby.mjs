import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { Client } from 'basic-ftp';

const rootDir = process.cwd();
const envFile = path.join(rootDir, '.env.deploy');
const localDir = path.join(rootDir, 'dist');

async function loadDeployEnv() {
  if (!existsSync(envFile)) {
    return;
  }

  const content = await readFile(envFile, 'utf8');
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separator = line.indexOf('=');
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function requireEnv(name, fallback) {
  const value = process.env[name] || fallback;
  if (!value) {
    throw new Error(`Missing ${name}. Configure it in .env.deploy.`);
  }
  return value;
}

function parseSecure(value) {
  if (value === 'implicit') {
    return 'implicit';
  }

  return String(value).toLowerCase() === 'true';
}

async function main() {
  await loadDeployEnv();

  if (!existsSync(localDir)) {
    throw new Error('dist was not found. Run npm run build before deploying.');
  }

  const host = requireEnv('CLOUDWEBY_FTP_SERVER', '199.193.117.238');
  const user = requireEnv('CLOUDWEBY_FTP_USERNAME');
  const password = requireEnv('CLOUDWEBY_FTP_PASSWORD');
  const remoteDir = requireEnv('CLOUDWEBY_FTP_DIR', '/public_html/');
  const port = Number(process.env.CLOUDWEBY_FTP_PORT || 21);
  const secure = parseSecure(process.env.CLOUDWEBY_FTP_SECURE || 'false');

  const client = new Client();
  client.ftp.verbose = true;

  try {
    console.log(`Connecting to ${host}:${port}...`);
    await client.access({
      host,
      port,
      user,
      password,
      secure,
      secureOptions: { rejectUnauthorized: false },
    });

    console.log(`Uploading ${localDir} to ${remoteDir}...`);
    await client.ensureDir(remoteDir);
    await client.uploadFromDir(localDir);
    console.log('Deploy completed.');
  } finally {
    client.close();
  }
}

main().catch((error) => {
  console.error(`Deploy failed: ${error.message}`);
  process.exit(1);
});
