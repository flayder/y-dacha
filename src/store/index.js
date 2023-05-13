import {createStore, combineReducers, applyMiddleware} from "redux"
import {createLogger} from 'redux-logger'
import thunk from "redux-thunk";
import { userReducer } from "./redusers/user";
import {System} from "./redusers/system";
import {News} from "./redusers/news";
import {Masters} from "./redusers/masters";
import {Shops} from "./redusers/shops";
import {Events} from "./redusers/events";
import {Sorts} from "./redusers/sorts";
import {Drawers} from "./redusers/drawer";
import {Search} from "./redusers/search";
import {Cultures} from "./redusers/cultures";
import {Filter} from "./redusers/filter";
import {Pests} from "./redusers/pests";
import {Diseases} from "./redusers/diseases";
import {Notes} from "./redusers/notes";
import {Comments} from "./redusers/comments";
import {Chat} from "./redusers/chat";
import {Chemicals} from "./redusers/chemicals";
import {Order} from "./redusers/order";
import {Other} from "./redusers/other";
import {Notifications} from "./redusers/notifications";

const logger = createLogger({
    predicate(getState, action) {
        console.log('action', action.type)
        return null
    },
    duration: false,
    diff: false,
    diffPredicate() {
        return null
    }
})

const rootReducer = combineReducers({
    user: userReducer,
    system: System,
    news: News,
    masters: Masters,
    shops: Shops,
    events: Events,
    sorts: Sorts,
    drawers: Drawers,
    search: Search,
    cultures: Cultures,
    filter: Filter,
    pests: Pests,
    diseases: Diseases,
    notes: Notes,
    comments: Comments,
    chat: Chat,
    chemicals: Chemicals,
    order: Order,
    others: Other,
    notifications: Notifications
})
//logger
export default createStore(rootReducer, applyMiddleware(thunk))