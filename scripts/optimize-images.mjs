/**
 * Otimização de imagens (rodar com: npm run optimize:images)
 *
 *  - Converte os originais pesados de `assets-src/` para WebP redimensionado em `public/`
 *  - Baixa as imagens remotas (Pinterest, notícias etc.) uma única vez e serve do próprio site
 *    em `public/img/` => sem hotlink, sem dependência de terceiros em produção, carregamento
 *    pelo CDN do Netlify.
 *
 * É idempotente: o que já foi baixado/convertido é pulado (use --force para refazer).
 */
import sharp from 'sharp'
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const FORCE = process.argv.includes('--force')

const SRC = path.join(root, 'assets-src')
const REMOTE_CACHE = path.join(SRC, 'remote')
const PUBLIC = path.join(root, 'public')
const IMG = path.join(PUBLIC, 'img')

// ---------- 1) Originais locais ----------
// [arquivo em assets-src, saída em public, largura máx., qualidade]
const local = [
  ['3faixas3.png', '3faixas3.webp', 1400, 78],
  ['4faixas.png', '4faixas.webp', 1400, 78],
  ['4faixas2.png', '4faixas2.webp', 1400, 78],
  ['bgherolight.png', 'bgherolight.webp', 2000, 72],
  ['foto (5).png', 'foto (5).webp', 1100, 76],
  // logos: exibidos com ~80px de altura => 2x = 160px
  ...[
    'amstel', 'caffeine', 'clube', 'corona', 'fafeb', 'gatorade',
    'mikasa', 'nu', 'sol', 'sudesb', 'vitoria',
  ].map((n) => [`logo-${n}.png`, `logo-${n}.webp`, null, 88, { height: 160 }]),
]

// ---------- 2) Imagens remotas ----------
const hero = [
  'https://i.pinimg.com/736x/9f/a1/94/9fa1947f11c34424d8b81b84b2aadb74.jpg',
  'https://i.pinimg.com/736x/64/05/15/6405159aeea8b8fb7bc48ea7c34fd591.jpg',
  'https://i.pinimg.com/1200x/46/b0/a1/46b0a1049111344c80d27efe6e9d44a5.jpg',
  'https://i.pinimg.com/736x/f3/19/84/f31984c93a997420d812bca4bb7e2dd6.jpg',
  'https://i.pinimg.com/736x/84/ea/eb/84eaeb559c2fcde8ff9c6cf4b704ab08.jpg',
  'https://i.pinimg.com/736x/72/5c/25/725c25da4d5fa9d9a5a156b797beea27.jpg',
  'https://i.pinimg.com/1200x/18/19/f7/1819f7efa5cc86dd22ad441af9a11b8f.jpg',
  'https://i.pinimg.com/736x/47/b4/bd/47b4bd47e3a6360934816a9f2aca012b.jpg',
  'https://i.pinimg.com/1200x/18/80/11/18801189d45d80532c1e893cc8cbeaf3.jpg',
].map((url, i) => [url, `hero-trail-${i + 1}.webp`, 520, 72])

const remote = [
  ...hero,
  // Galeria "Em Quadra" (desktop = accordion, mobile = stack)
  ['https://anotabahia.com/wp-content/uploads/2024/09/anotabahia-clube-baiano-de-tenis-recebe-o-ace-open-moura-dubeux-2024-whatsapp-image-2024-09-03-at-13.33.15-1200x800.jpeg', 'gallery-clube-baiano.webp', 1100, 74],
  ['https://www.bahianoticias.com.br/fotos/hall_noticias/4901/mg/Soft%20opening%20Praiana_3.jpg', 'gallery-praiana.webp', 1100, 74],
  ['https://cloudfront-us-east-1.images.arcpublishing.com/newr7/ZGVOOLIAXZDTNEBCOCTQGVCF4E.jpg', 'gallery-mali.webp', 1100, 74],
  ['https://anotabahia.com/wp-content/uploads/2022/11/anotabahia-bahia-open-de-futevolei-bahia-open-de-futevolei.jpg', 'gallery-bahia-open.webp', 1100, 74],
  ['https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/915c1b135567345.67b75ec924309.jpg', 'gallery-mali-mobile.webp', 900, 74],
  ['https://canalgarra.com.br/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-08-at-14.27.29.jpeg.webp', 'gallery-bahia-open-mobile.webp', 900, 74],
  // Stats (hero com clip-path)
  ['https://navegantes.sc.gov.br/wp-content/uploads/2025/01/Circuito-Brasileiro-de-Volei-de-Praia-Credito-da-foto-Mauricio-Val-FV-Imagem-CBV-4.jpg', 'stats-desktop.webp', 1920, 70],
  ['https://mir-s3-cdn-cf.behance.net/project_modules/fs/8f1ae7135567345.623b402809d39.jpg', 'stats-mobile.webp', 1000, 72],
  // Catálogo
  ['https://6d995b8381.cbaul-cdnwnd.com/38958216990b58d66c8d7fd8b0c6ff46/200000301-ad357ae2f3/IMG_5107-9.JPG?ph=6d995b8381', 'catalog-orelha.webp', 1200, 76],
]

const kb = (n) => `${(n / 1024).toFixed(0)} KB`
const fresh = async (out) => !FORCE && existsSync(out)

async function convert(input, out, width, quality, extra = {}) {
  const resize = extra.height
    ? { height: extra.height, withoutEnlargement: true }
    : { width, withoutEnlargement: true }
  const info = await sharp(input).rotate().resize(resize).webp({ quality, effort: 5 }).toFile(out)
  const { size } = await stat(out)
  console.log(`  ✓ ${path.relative(root, out)}  ${info.width}x${info.height}  ${kb(size)}`)
}

async function download(url, cacheFile) {
  if (existsSync(cacheFile)) return readFile(cacheFile)
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(cacheFile, buf)
  return buf
}

await mkdir(IMG, { recursive: true })
await mkdir(REMOTE_CACHE, { recursive: true })

console.log('\n▸ Imagens locais')
for (const [file, out, width, quality, extra] of local) {
  const input = path.join(SRC, file)
  const output = path.join(PUBLIC, out)
  if (!existsSync(input)) {
    console.log(`  – ${file} (original não encontrado em assets-src, pulando)`)
    continue
  }
  if (await fresh(output)) {
    console.log(`  = ${out} (já existe)`)
    continue
  }
  try {
    await convert(input, output, width, quality, extra)
  } catch (e) {
    console.log(`  ✗ ${file}: ${e.message}`)
  }
}

console.log('\n▸ Imagens remotas')
const failed = []
for (const [url, out, width, quality] of remote) {
  const output = path.join(IMG, out)
  if (await fresh(output)) {
    console.log(`  = img/${out} (já existe)`)
    continue
  }
  try {
    const buf = await download(url, path.join(REMOTE_CACHE, out + '.src'))
    await convert(buf, output, width, quality)
  } catch (e) {
    failed.push(out)
    console.log(`  ✗ ${out}: ${e.message}\n    ${url}`)
  }
}

console.log(
  failed.length
    ? `\n⚠ ${failed.length} imagem(ns) remota(s) falharam: ${failed.join(', ')}\n  Baixe manualmente, salve em assets-src/remote/<nome>.src e rode de novo.`
    : '\n✔ Tudo pronto.',
)
