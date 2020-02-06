import React from 'react';
import {Route} from 'react-router-dom'

import NotificationsComponent from './notifications';
import TransfersComponent from "./transfers";
import ConstantEventsComponent from "./const-events";
import NotesComponent from "./notes";
import ListsComponent from "./lists";
import PhotosComponent from "./photos";

/**
 * Base router component
 */
export default class StateComponent extends React.Component {
    render() {
        return <div>
            <Route exact path="/photos" component={NotificationsComponent}/>
            <Route exact path="/transfers" component={TransfersComponent}/>
            <Route exact path="/notes" component={NotesComponent}/>
            <Route exact path="/events" component={ConstantEventsComponent}/>
            <Route exact path="/lists" component={ListsComponent}/>
            <Route exact path="/" component={PhotosComponent}/>
        </div>
    }
}
