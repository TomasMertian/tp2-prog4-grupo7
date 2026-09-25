import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - listNotes (Ejercicio 2)', () => {
    let service: NoteServiceImpl;

    beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
    });

    it('debe devolver una lista vacia si no hay notas', () => {
    const notes = service.listNotes();
    expect(notes).toHaveLength(0);
    expect(notes).toEqual([]);
    });

    it('debe listar todas las notas guardadas', () => {
    service.createNote({ title: 'Primera nota', content: 'Contenido 1' });
    service.createNote({ title: 'Segunda nota', content: 'Contenido 2' });

    const notes = service.listNotes();
    
    expect(notes).toHaveLength(2);
    expect(notes[0].title).toBe('Primera nota');
    expect(notes[1].title).toBe('Segunda nota');
    });
});
// test en verde con la integración del ejercicio 1