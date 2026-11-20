// web/src/enums/jobStatuses.enum.ts

import { Enum } from '@enum'

export const enumJobStatuses = new Enum([
  { id: 1, value: 'Prospecting', slug: 'prospecting', description: 'When a potential client first reaches out' },
  { id: 2, value: 'Estimating', slug: 'estimating', description: 'After initial conversation, before sending a bid' },
  { id: 3, value: 'Bid Sent', slug: 'bidSent', description: 'Bid has been sent to the client & waiting for client decision' },
  { id: 4, value: 'Negotiating', slug: 'negotiating', description: 'Client is interested but wants to adjust scope or price' },
  { id: 5, value: 'Won', slug: 'won', description: 'Client has accepted the bid, contract signed' },
  { id: 6, value: 'Scheduling', slug: 'scheduling', description: `Job is won, we're coordinating dates and logistics` },
  { id: 7, value: 'Active', slug: 'active', description: 'Work is actively in progress' },
  { id: 8, value: 'Paused', slug: 'paused', description: 'Work is temporarily stopped (e.g., weather, materials delay)' },
  { id: 9, value: 'Review', slug: 'review', description: 'Work is complete and undergoing quality inspection' },
  { id: 10, value: 'Completed', slug: 'completed', description: 'Job is finished and accepted' },
  { id: 11, value: 'Invoiced', slug: 'invoiced', description: 'Final invoice has been sent to client' },
  { id: 12, value: 'Paid', slug: 'paid', description: 'Client has paid in full' },
  { id: 13, value: 'Cancelled', slug: 'cancelled', description: 'Client cancels, or we decide not to proceed' },
  { id: 14, value: 'Lost', slug: 'lost', description: 'Client chose someone else' },
], 'slug')
