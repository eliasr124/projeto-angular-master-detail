import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataBase implements InMemoryDbService{
    createDb(): any {
        const categories = [
            { id: 1, name: 'Moradia', descripition: 'Pagamentos de contas da casa' },
            { id: 2, name: 'Saúde', descripition: 'Plano de Saúde e remedio' },
            { id: 3, name: 'Lazer', descripition: 'cinema,parques, praia, etc' },
            { id: 4, name: 'Salário', descripition: 'Recebimento de salários' },
            { id: 5, name: 'Moradia', descripition: 'Pagamentos de contas da casa' }
        ]
    }
}