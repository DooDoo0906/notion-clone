import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../migration/schema'
import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    console.log("No database URL");
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });
//everytime db is being use, this function will be fired and migrate data => keep data up to date
const migrateDb = async () => {
    try {
        console.log("Migrating client");
        await migrate(db, { migrationsFolder: "migration" });
        console.log("✅ Successfully Migrated");
    }
    catch (error) {
        console.log("❌ Fail Migrating: ", error);
    }
}
migrateDb();
export default db;
