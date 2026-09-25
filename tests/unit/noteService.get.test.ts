import { describe, it, expect, beforeEach} from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - getNote (Ejercicio 3)', () => {

    let service: NoteServiceImpl;

    beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
    });

    it('obtiene una nota por id', () => {
        const creada = service.createNote({
            title: 'Lista supermercado',
            content: 'Comprar leche y pan',});
        const encontrada = service.getNote(creada.id);
        expect(encontrada).toEqual(creada);
    });

    it('devuelve undefined si la nota no existe', () => {
        const resultado = service.getNote(9999);
        expect(resultado).toBeUndefined();
    });

});