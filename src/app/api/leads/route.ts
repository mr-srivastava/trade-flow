import { z } from 'zod';
import { db, schema } from '@/lib/db';

// Lead writes must never be cached.
export const dynamic = 'force-dynamic';

const leadSchema = z.object({
  type: z.enum(['contact', 'quote']),
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  quantity: z.string().optional().nullable(),
  requirements: z.string().optional().nullable(),
  product_id: z.string().optional().nullable(),
  product_name: z.string().optional().nullable(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const d = parsed.data;

  try {
    const [row] = await db
      .insert(schema.leads)
      .values({
        type: d.type,
        name: d.name,
        email: d.email,
        company: d.company ?? null,
        phone: d.phone ?? null,
        subject: d.subject ?? null,
        message: d.message ?? null,
        quantity: d.quantity ?? null,
        requirements: d.requirements ?? null,
        productId: d.product_id ?? null,
        productName: d.product_name ?? null,
      })
      .returning({ id: schema.leads.id });

    return Response.json({ ok: true, id: row?.id }, { status: 201 });
  } catch (error: unknown) {
    // Foreign key violation: product_id references a product that doesn't exist.
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === '23503') {
      return Response.json({ error: 'Unknown product_id' }, { status: 400 });
    }
    console.error('POST /api/leads failed:', error);
    return Response.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}
