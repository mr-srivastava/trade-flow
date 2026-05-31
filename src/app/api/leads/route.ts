import { z } from 'zod';
import { query } from '@/lib/db';

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
    const rows = await query<{ id: string }>(
      `insert into leads
         (type, name, email, company, phone, subject, message,
          quantity, requirements, product_id, product_name)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       returning id`,
      [
        d.type,
        d.name,
        d.email,
        d.company ?? null,
        d.phone ?? null,
        d.subject ?? null,
        d.message ?? null,
        d.quantity ?? null,
        d.requirements ?? null,
        d.product_id ?? null,
        d.product_name ?? null,
      ],
    );

    return Response.json({ ok: true, id: rows[0]?.id }, { status: 201 });
  } catch (error: unknown) {
    // Foreign key violation: product_id references a product that doesn't exist.
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === '23503') {
      return Response.json({ error: 'Unknown product_id' }, { status: 400 });
    }
    console.error('POST /api/leads failed:', error);
    return Response.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}
