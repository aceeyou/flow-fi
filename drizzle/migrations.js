// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_spooky_diamondback.sql';
import m0001 from './0001_yummy_proteus.sql';
import m0002 from './0002_colorful_dormammu.sql';
import m0003 from './0003_familiar_spencer_smythe.sql';
import m0004 from './0004_striped_sheva_callister.sql';
import m0005 from './0005_re-create the tables again.sql';
import m0006 from './0006_added_notNull_for_isImage_property_from_accounts.sql';
import m0007 from './0007_changed_type_of_transaction.amount_to_string.sql';
import m0008 from './0008_fixed_typing_of_transaction.type.sql';
import m0009 from './0009_fixed_typing_of_transaction_attributes.sql';
import m0010 from './0010_added_notNull_rule_to_transction.created_at.sql';
import m0011 from './0011_added_default_value_to_transaction.amount.sql';
import m0012 from './0012_added_notNull_to_transaction.description.sql';
import m0013 from './0013_added_repeating_transaction_table_for_repeating_transactions.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004,
m0005,
m0006,
m0007,
m0008,
m0009,
m0010,
m0011,
m0012,
m0013
    }
  }
  