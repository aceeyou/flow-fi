// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_spooky_diamondback.sql';
import m0001 from './0001_yummy_proteus.sql';
import m0002 from './0002_colorful_dormammu.sql';
import m0003 from './0003_familiar_spencer_smythe.sql';
import m0004 from './0004_striped_sheva_callister.sql';
import m0005 from './0005_re-create the tables again.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004,
m0005
    }
  }
  