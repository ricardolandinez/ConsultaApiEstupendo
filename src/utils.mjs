import { fileURLToPath } from 'url';
import { dirname } from 'path';

const cwd = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
 return __dirname
}

export {cwd}