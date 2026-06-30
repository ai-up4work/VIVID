import seedMockData from '@/lib/seed-mock-data';

export async function GET() {
  try {
    const result = await seedMockData();
    return Response.json({ success: true, result });
  } catch (error) {
    return Response.json({ success: false, error: String(error) }, { status: 500 });
  }
}