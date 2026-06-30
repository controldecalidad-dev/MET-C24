import type { Evaluacion } from "./types";

const STORAGE_KEY = "met_c24_evaluaciones";

export interface StorageAdapter {
  getAll(): Promise<Evaluacion[]>;
  getById(id: string): Promise<Evaluacion | null>;
  save(evaluacion: Evaluacion): Promise<void>;
  delete(id: string): Promise<void>;
}

class LocalStorageAdapter implements StorageAdapter {
  async getAll(): Promise<Evaluacion[]> {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  async getById(id: string): Promise<Evaluacion | null> {
    const all = await this.getAll();
    return all.find((e) => e.id === id) ?? null;
  }

  async save(evaluacion: Evaluacion): Promise<void> {
    const all = await this.getAll();
    const index = all.findIndex((e) => e.id === evaluacion.id);
    if (index >= 0) {
      all[index] = evaluacion;
    } else {
      all.push(evaluacion);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  async delete(id: string): Promise<void> {
    const all = await this.getAll();
    const filtered = all.filter((e) => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
}

export const storage: StorageAdapter = new LocalStorageAdapter();
