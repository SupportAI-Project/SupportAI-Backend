import { DataSource as Connection } from 'typeorm';

export async function testDatabaseConnection(
  connection: Connection,
): Promise<string> {
  try {
    if (connection.isInitialized) {
      return 'Database connection successful';
    }
  } catch (error) {
    return `Database connection failed: ${error.message}`;
  }
}
