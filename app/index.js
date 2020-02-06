import React from "react";
import {render} from "react-dom";
import AppComponent from './app';
import { library } from '@fortawesome/fontawesome-svg-core'
import * as icons from '@fortawesome/free-solid-svg-icons'

const container = window.document.querySelector("#main-container");
library.add(...Object.values(icons.fas));
render(<AppComponent/>, container);
