import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { makeApp } from '../../src/app';

describe('PATCH /notes/:id (Ejercicio 4 - integracion)', () => {
  let app: ReturnType<typeof makeApp>;

  beforeEach(() => {
    app = makeApp(':memory:');
  });

  it('actualiza parcialmente la nota (200)', async () => {
    const creada = (await request(app).post('/notes').send({ title: 'Comprar pan', content: 'Antes de las 20hs' })).body;
    const res = await request(app).patch(`/notes/${creada.id}`).send({ title: 'Comprar pan integral' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Comprar pan integral');
    expect(res.body.content).toBe('Antes de las 20hs');
  });

  it('devuelve 404 si la nota no existe', async () => {
    const res = await request(app).patch('/notes/9999').send({ title: 'X' });
    expect(res.status).toBe(404);
  });
});
