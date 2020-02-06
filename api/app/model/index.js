import NotificationsMysql from "./notifications.mysql";
import UsersMysql from "./users.mysql";
import PhotoAlbumMysql from "./photo-albums.mysql";

export default {
    'notifications': NotificationsMysql,
    'users': UsersMysql,
    'photoAlbum': PhotoAlbumMysql
}
