import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCars1650052859826 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cars',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    },
                    {
                        name: 'daily_rate',
                        type: 'numeric'
                    },
                    {
                        name: 'available',
                        type: 'boolean',
                        default: true
                    },
                    {
                        name: 'license_plate',
                        type: 'varchar'
                    },
                    {
                        name: 'fine_amount',
                        type: 'numeric'
                    },
                    {
                        name: 'brand',
                        type: 'varchar'
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKCategoryCar', // Nome da chave estrangeira
                        referencedTableName: 'categories', // Tabela origem
                        referencedColumnNames: ['id'], // Nome do campo na tabela origem
                        columnNames: ['category_id'], // Nome do campo na tabela destino
                        onDelete: 'SET NULL', // Se a categoria (tabela origem) for removida o campo ficará nulo
                        onUpdate: 'SET NULL'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars')
    }
}
