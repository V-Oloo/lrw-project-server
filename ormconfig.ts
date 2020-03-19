import { configurationService } from './src/config/configuration.service';
import fs = require('fs');

fs.writeFileSync('ormconfig.json',
 JSON.stringify(configurationService.getTypeOrmConfig(), null, 2)
);