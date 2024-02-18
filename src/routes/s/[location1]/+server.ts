import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { i18n } from '$lib/i18n';

export const GET: RequestHandler = async () => {
    redirect(307, i18n.resolveRoute("/"));
};