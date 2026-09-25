import { describe, it, expect, beforeEach,vi } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';
import { notify } from '../../src/services/notificationService';
// 🔴 EJERCICIO 1 — Este archivo YA ESTÁ ESCRITO y el test está en ROJO
// porque NoteService.createNote todavía no está implementado.
//
// Consigna: NO modifiquen este archivo. Vayan a
// src/services/NoteService.ts e implementen createNote hasta que estos
// 3 tests pasen (Verde). Después, refactoricen si hace falta.
  //mock con la ruta exacta del modulo
vi.mock('../../src/services/notificationService', () => ({
  notify: vi.fn(),
}));
describe('NoteService - createNote (Ejercicio 1)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('crea una nota con id, title y content', () => {
    const note = service.createNote({ title: 'Comprar pan', content: 'Antes de las 20hs' });
    expect(note.id).toBeDefined();
    expect(note.title).toBe('Comprar pan');
    expect(note.content).toBe('Antes de las 20hs');
  });

  it('si no se indica pinned, por defecto es false', () => {
    const note = service.createNote({ title: 'A', content: 'B' });
    expect(note.pinned).toBe(false);
  });

  it('la nota creada aparece luego en listNotes()', () => {
    service.createNote({ title: 'A', content: 'B' });
    service.createNote({ title: 'C', content: 'D' });
    expect(service.listNotes()).toHaveLength(2);
  });

  // test ejercicio 6
  describe('notify pinned - Notify (ejercicio 6)', () => {
    it('creamos una nota pineada', () => {
      const nota = service.createNote({
        title: 'x',
        content: 'y',
        pinned: true
      })
      expect(notify).toHaveBeenCalledWith(nota)
    }
    )});

});
