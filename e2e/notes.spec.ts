import { test, expect } from '@playwright/test';
import { resetAndSeed } from './helpers';

test('obtiene las notas', async ({ request, baseURL }) => {
    await resetAndSeed(baseURL!);

    const response = await request.get('/notes');

    expect(response.status()).toBe(200);

    const notes = await response.json();

    expect(notes).toHaveLength(2);
});

test('devuelve 404 si la nota no existe', async ({ request, baseURL }) => {
    await resetAndSeed(baseURL!);

    const response = await request.get('/notes/999');

    expect(response.status()).toBe(404);
});