import { writeFile } from 'node:fs/promises'

// GitHub Pages serves the generated files without Jekyll processing.
await writeFile(new URL('../docs/.nojekyll', import.meta.url), '')
