import 'module-alias/register';
import { addAliases } from 'module-alias';
import { join } from 'path';


addAliases({
    '@Src': __dirname,
    '@Database': join(__dirname, 'core', 'database'),
    '@Config': join(__dirname, 'config'),
    '@Controllers': join(__dirname, 'controllers'),
    '@Services': join(__dirname, 'core', 'services'),
    '@Repositories': join(__dirname, 'core', 'repositories'),
    '@Interfaces': join(__dirname, 'core', 'interfaces'),
    '@Routes': join(__dirname, 'routes'),
    '@Shared': join(__dirname, 'shared'),
    '@Middlewares': join(__dirname, 'middlewares')
});