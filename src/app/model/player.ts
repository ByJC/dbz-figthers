import { Warrior } from './warrior';

export interface Player {
    name: string,
    id: number,
    warriors: Warrior[],
}