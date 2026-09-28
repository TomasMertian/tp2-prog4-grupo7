import { describe, it, expect, beforeEach } from 'vitest'; 
import { NoteServiceImpl } from '../../src/services/NoteService'; 
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository'; 
import { createDb } from '../../src/db/connection';

describe('NoteService - deleteNote (Ejercicio 5)', () => {

    let service: NoteServiceImpl;

    beforeEach(() => {
        const db = createDb(':memory:');
        const repo = new SqliteNoteRepository(db);
        service = new NoteServiceImpl(repo);
    });

    it('elimina una nota existente', () => {
        const creada = service.createNote({
            title: 'Lista supermercado',
            content: 'Comprar leche y pan',
        });
        const eliminada = service.deleteNote(creada.id);
        expect(eliminada).toBe(true);
        const encontrada = service.getNote(creada.id);
        expect(encontrada).toBeUndefined();
    });

    it('devuelve false si la nota no existe', () => {
        const resultado = service.deleteNote(9999);
        expect(resultado).toBe(false);
    });   
    
});