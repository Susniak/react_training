import DatabaseQueries from "../../core/mysql-database/database-queries";

const tableName = 'photoAlbums';
const fields = [
    {
        name: 'id',
        type: 'number',
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
        model: 'users',
        relation: DatabaseQueries.ONE_TO_ONE
    }
];

export default class PhotoAlbumsMysql extends DatabaseQueries {
    constructor(models) {
        super(tableName, fields, models);
    }
}
