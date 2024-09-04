import Airtable, { FieldSet } from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN as string }).base('app3IJL40CZRNspWs');

/**
 * Generic type representing a record with an ID and fields.
 */
interface AirtableRecord<RecordType> {
    id: string;
    fields: RecordType;
}


/**
 * Update a record in a specified table
 * @param id - The ID of the record to update
 * @param tableName - The name of the Airtable table
 * @param fields - The fields to update
 * @returns A promise that resolves to the updated record data
 */
export async function updateRecord<RecordType>(id: string, tableName: string, fields: Partial<FieldSet>): Promise<AirtableRecord<RecordType>> {
    return new Promise((resolve, reject) => {
        
        base(tableName).update(id, fields, (err: any, record?: Airtable.Record<FieldSet>) => {
            if (err) {
                console.error(err);
                reject(err);
            } else if (record) {
                const updatedRecord: AirtableRecord<RecordType> = {
                    id: record.getId(),
                    fields: record.fields as RecordType,
                };
                resolve(updatedRecord);
            } else {
                reject(new Error('Record not found'));
            }
        });
    });
}

/**
 * Get a record by ID
 * @param id - The ID of the record to retrieve
 * @param tableName - The name of the Airtable table to query
 * @returns A promise that resolves to the record data
 */
export async function getRecordById<RecordType>(id: string, tableName: string): Promise<AirtableRecord<RecordType> | null> {
    return new Promise((resolve, reject) => {
        base(tableName).find(id, (err: any, record?: Airtable.Record<FieldSet>) => {
            if (err) {
                console.error(err);
                reject(err);
            } else if (record) {
                const result: AirtableRecord<RecordType> = {
                    id: record.getId(),
                    fields: record.fields as RecordType,
                };
                resolve(result);
            } else {
                resolve(null);
            }
        });
    });
}


/**
 * Get all records from a specified table
 * @param tableName - The name of the Airtable table to query
 * @param filter - "OR(RECORD_ID() = 'rec7UTvw2tRl3beoY', RECORD_ID() = 'recLfKAQcoZcTibvn', RECORD_ID() = 'recgdapH7FTPYnAcY')"
 * @returns A promise that resolves to an array of records
 */
/**
 * Get all records from a specified table
 * @param tableName - The name of the Airtable table to query
 * @param fields - An array of field names to retrieve
 * @param filter - Optional filter string for Airtable query
 * @returns A promise that resolves to an array of records
 */
export async function getAllRecords<RecordType>(tableName: string, fields: (keyof RecordType)[], filter?: string): Promise<AirtableRecord<RecordType>[]> {
    const recordsList: AirtableRecord<RecordType>[] = [];
    return new Promise((resolve, reject) => {
        base(tableName).select({
            // maxRecords: 3,
            view: "Grid view",
            filterByFormula: filter ? filter : "" as string,
            fields: fields as string[], // Cast the fields to a string array
        }).eachPage(
            (records: Airtable.Records<FieldSet>, fetchNextPage: () => void) => {
                records.forEach((record) => {
                    console.log('Retrieved', record.getId());
                    recordsList.push({
                        id: record.getId(),
                        fields: record.fields as RecordType
                    });
                });

                fetchNextPage();
            },
            (err: any) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(recordsList);
                }
            }
        );
    });
}
