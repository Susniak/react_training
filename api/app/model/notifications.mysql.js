import DatabaseQueries from "../../core/mysql-database/database-queries";

const tableName = 'notifications';
const fields = [
    {
        name: 'id',
        type: 'number',
        primaryKey: true
    },
    {
        name: 'date',
        type: 'date'
    },
    {
        name: 'title',
        type: 'string'
    },
    {
        name: 'user_id',
        type: 'number',
        foreignKey: true,
        model: 'users',
        relation: DatabaseQueries.ONE_TO_ONE
    }
];

class NotificationsMysql extends DatabaseQueries {
    constructor(models) {
        super(tableName, fields, models);
    }
}

export default NotificationsMysql;
