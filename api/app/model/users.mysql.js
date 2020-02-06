import DatabaseQueries from "../../core/mysql-database/database-queries";

const tableName = 'users';
const fields = [
    {
        name: 'id',
        type: 'number',
        required: true,
        primaryKey: true
    },
    {
        name: 'name',
        type: 'string'
    },
    {
        name: 'user_id',
        type: 'number',
        foreignKey: true,
        model: 'notifications',
        relation: DatabaseQueries.ONE_TO_MANY
    }
];

class UsersMysql extends DatabaseQueries {
    constructor(models) {
        super(tableName, fields, models);
    }
}

export default UsersMysql;
