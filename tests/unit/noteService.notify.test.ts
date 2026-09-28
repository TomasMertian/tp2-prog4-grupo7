import { describe, it, expect, beforeEach,vi } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';
import { notify } from '../../src/services/notificationService';

vi.mock('../../src/services/notificationService', () => ({
  notify: vi.fn(),
}));
// test ejercicio 6
  describe('notify pinned - Notify (ejercicio 6)', () => {
    let service: NoteServiceImpl;

    beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
    });
    
    it('creamos una nota pineada', () => {
      const nota = service.createNote({
        title: 'x',
        content: 'y',
        pinned: true
      })
      expect(notify).toHaveBeenCalledWith(nota)
    }
    )});
