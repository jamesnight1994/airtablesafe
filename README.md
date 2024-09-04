
---

# Airtable Utility Module

This module provides utility functions to interact with Airtable, allowing you to update records, retrieve records by ID, and fetch all records from a specific table. It uses the Airtable JavaScript client library and is designed to work with TypeScript.

## Installation

To use this module, you need to have `airtable` installed in your project. You can install it via npm:

```bash
npm install airtable
```

## Environment Variables

This module relies on the `AIRTABLE_API_TOKEN` environment variable for authentication with the Airtable API. Make sure to set this variable in your environment:

```bash
export AIRTABLE_API_TOKEN=your_airtable_api_token
```

## Usage

### Importing the Module

To use the functions provided by this module, import them as follows:

```typescript
import { updateRecord, getRecordById, getAllRecords } from './path/to/airtableModule';
```

### Functions

#### 1. `updateRecord`

Updates a record in a specified Airtable table.

```typescript
import { updateRecord } from './path/to/airtableModule';

const updatedRecord = await updateRecord<RecordType>(
    'recordId',
    'TableName',
    { FieldName: 'New Value' }
);
```

- `id`: The ID of the record to update.
- `tableName`: The name of the Airtable table.
- `fields`: The fields to update.
- Returns: A promise that resolves to the updated record data.

#### 2. `getRecordById`

Retrieves a record from a specified Airtable table by its ID.

```typescript
import { getRecordById } from './path/to/airtableModule';

const record = await getRecordById<RecordType>('recordId', 'TableName');
```

- `id`: The ID of the record to retrieve.
- `tableName`: The name of the Airtable table.
- Returns: A promise that resolves to the record data or `null` if not found.

#### 3. `getAllRecords`

Retrieves all records from a specified Airtable table, optionally filtered by a formula.

```typescript
import { getAllRecords } from './path/to/airtableModule';

const records = await getAllRecords<RecordType>(
    'TableName',
    ['FieldName1', 'FieldName2'],
    "OR(RECORD_ID() = 'rec1', RECORD_ID() = 'rec2')"
);
```

- `tableName`: The name of the Airtable table to query.
- `fields`: An array of field names to retrieve.
- `filter`: (Optional) A filter string for the Airtable query.
- Returns: A promise that resolves to an array of records.

### Example

Here’s a quick example of how you might use these functions:

```typescript
import { updateRecord, getRecordById, getAllRecords } from './path/to/airtableModule';

async function exampleUsage() {
    const recordId = 'rec123456789';
    const tableName = 'MyTable';

    // Update a record
    await updateRecord(recordId, tableName, { Status: 'Completed' });

    // Get a record by ID
    const record = await getRecordById(recordId, tableName);
    console.log('Record:', record);

    // Get all records with optional filtering
    const records = await getAllRecords(tableName, ['Name', 'Status'], "OR(RECORD_ID() = 'rec1', RECORD_ID() = 'rec2')");
    console.log('Records:', records);
}

exampleUsage();
```

## License

This module is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

You can adjust the paths and field names in the examples as needed for your specific use case.
