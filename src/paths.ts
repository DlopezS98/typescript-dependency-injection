import 'module-alias/register';
import { addAliases } from 'module-alias';
import { join } from 'path';


addAliases({
    '@Database': join(__dirname, 'database'),
    '@Config': join(__dirname, 'config'),
    '@Controllers': join(__dirname, 'controllers'),
    '@Services': join(__dirname, 'services'),
    '@Repositories': join(__dirname, 'repositories'),
    '@Routes': join(__dirname, 'routes'),
    '@Shared': join(__dirname, 'shared')
});