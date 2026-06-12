// Temporário: testa conexão FTP (lê tudo do .env.deploy) e inspeciona a estrutura.
// NÃO faz upload. Não imprime a senha.
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { Client } from 'basic-ftp';

const envFile = path.join(process.cwd(), '.env.deploy');

async function loadEnv() {
  if (!existsSync(envFile)) return {};
  const content = await readFile(envFile, 'utf8');
  const env = {};
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const i = line.indexOf('=');
    if (i === -1) continue;
    env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '');
  }
  return env;
}

const env = await loadEnv();
const host = env.CLOUDWEBY_FTP_SERVER;
const port = Number(env.CLOUDWEBY_FTP_PORT || 21);
const user = env.CLOUDWEBY_FTP_USERNAME;
const password = env.CLOUDWEBY_FTP_PASSWORD;

async function tryLogin(secure) {
  const client = new Client(20000);
  client.ftp.verbose = false;
  try {
    await client.access({ host, port, user, password, secure, secureOptions: { rejectUnauthorized: false } });
    return client;
  } catch (e) {
    client.close();
    throw e;
  }
}

async function listHere(client, label) {
  console.log(`--- ${label} (pwd=${await client.pwd()}) ---`);
  for (const f of await client.list()) {
    console.log(`${f.type === 2 ? '[dir] ' : '      '}${f.name}\t${f.size}b`);
  }
}

let client;
try {
  console.log(`Login em ${host}:${port} como "${user}" ...`);
  try {
    client = await tryLogin(true);
    console.log('LOGIN OK ✅ (FTPS/TLS — use CLOUDWEBY_FTP_SECURE=true)');
  } catch (tlsErr) {
    console.log(`  TLS falhou (${tlsErr.message}); tentando FTP simples...`);
    client = await tryLogin(false);
    console.log('LOGIN OK ✅ (FTP simples)');
  }

  await listHere(client, 'HOME (onde a conta FTP cai)');

  // procura a raiz web
  for (const candidate of ['public_html', `public_html/leveljiujitsu.com.br`, 'leveljiujitsu.com.br', 'www']) {
    try {
      await client.cd('/');
      await client.cd(candidate);
      await listHere(client, `encontrei: /${candidate}`);
    } catch {
      // não existe esse caminho a partir da raiz — segue
    }
  }
} catch (e) {
  console.error(`FALHOU: ${e.message}`);
  process.exitCode = 1;
} finally {
  if (client) client.close();
}
