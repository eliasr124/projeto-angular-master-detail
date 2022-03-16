import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataBase implements InMemoryDbService{
    createDb(): any {
        const categories = [
            { id: 1, name: 'Moradia', description: 'Pagamentos de contas da casa' },
            { id: 2, name: 'Saúde', description: 'Plano de Saúde e remedio' },
            { id: 3, name: 'Lazer', description: 'cinema,parques, praia, etc' },
            { id: 4, name: 'Salário', description: 'Recebimento de salários' },
            { id: 5, name: 'Moradia', description: 'Pagamentos de contas da casa' }
        ]

        return { categories };
    }
}