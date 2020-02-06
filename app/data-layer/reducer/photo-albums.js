import PhotoAlbumActions from '../actions/photo-albums.actions';
import CRUDReducer from '../helpers/CRUDReducer';

export default CRUDReducer(PhotoAlbumActions, 'id');
