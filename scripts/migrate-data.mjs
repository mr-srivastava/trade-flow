import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import path from 'path';

// Import the existing data (this needs to be compiled first)
// For now, we'll create a manual data transfer
async function migrateData() {
  try {
    // Set up database path
    const dbPath = path.resolve(process.cwd(), 'db.json');
    
    // Create adapter and database instance
    const adapter = new JSONFile(dbPath);
    const db = new Low(adapter, { products: [], total_products: 0 });

    // Read current database
    await db.read();

    // Check if migration is needed
    if (db.data.products.length > 0) {
      console.log('Database already contains data. Migration skipped.');
      return;
    }

    // Manual data insertion - you can copy the products array from data.ts here
    // For now, we'll demonstrate with the structure
    console.log('Starting data migration...');
    
    // This is where you would paste the actual product data from your data.ts file
    // For demonstration, we'll add one sample product
    const sampleProduct = {
      "id": "acd99fe2-618b-4d6e-8edb-079de3749318",
      "created_at": "2025-05-18T16:06:08.002978Z",
      "updated_at": "2025-05-18T16:06:08.002978Z",
      "name": "AMLODIPINE",
      "slug_name": "amlodipine",
      "hsn_no": "30049072",
      "cas_number": "88150-42-9",
      "iupac_name": "3-ethyl 5-methyl 2-[(2-aminoethoxy)methyl]-4-(2-chlorophenyl)-6-methyl-1,4-dihydropyridine-3,5-dicarboxylate",
      "molecular_formula": "C20H25ClN2O5",
      "description": "Amlodipine is used in antihypertensive and anti-anginal medications to treat high blood pressure and heart diseases.",
      "industries": ["Pharmaceutical"],
      "properties": [
        {
          "key": "Appearance",
          "value": "White to off-white"
        },
        {
          "key": "Solubility", 
          "value": "Soluble in ethanol"
        }
      ],
      "safety_and_hazard": [
        {
          "key": "GHS Classification",
          "value": "Acute toxicity, oral (Category 4)"
        }
      ],
      "applications": [
        {
          "key": "General Use",
          "value": "Amlodipine is a calcium channel blocker predominantly used in the treatment of hypertension and coronary artery disease."
        }
      ],
      "certificates": [],
      "faq": []
    };

    // Insert sample data
    db.data.products = [sampleProduct];
    db.data.total_products = 1;

    // Write to database
    await db.write();

    console.log('✅ Data migration completed successfully!');
    console.log(`Migrated ${db.data.total_products} products to database.`);
    
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  }
}

// Run migration
migrateData(); 