import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - updateNote (Ejercicio 4)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('actualiza solo el title y no toca el content', () => {
    const creada = service.createNote({ title: 'Original', content: 'Contenido original' });
    const actualizada = service.updateNote(creada.id, { title: 'Nuevo' });
    expect(actualizada?.title).toBe('Nuevo');
    expect(actualizada?.content).toBe('Contenido original');
  });

  it('actualiza solo el content y no toca el title', () => {
    const creada = service.createNote({ title: 'Original', content: 'Contenido original' });
    const actualizada = service.updateNote(creada.id, { content: 'Contenido nuevo' });
    expect(actualizada?.content).toBe('Contenido nuevo');
    expect(actualizada?.title).toBe('Original');
  });

  it('devuelve undefined si la nota no existe', () => {
    expect(service.updateNote(9999, { title: 'X' })).toBeUndefined();
  });
});
