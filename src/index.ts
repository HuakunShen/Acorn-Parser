import { help } from './helper';
import { letter2numberGpaMap, log, warn, error } from '../ts/utils';
console.log('src/index.ts');
help();

log(letter2numberGpaMap);
warn(letter2numberGpaMap);
error(letter2numberGpaMap);
