import { object, ObjectSchema, string } from "yup";
import { UserSettings } from "../../../types/types";


export const SettingsSchema : ObjectSchema<UserSettings> = object({
    
    currentlyReadingId : string().nullable().defined(),

    email              : string().nullable().defined(), 

    location           : string().nullable().defined(), 

    name               : string().nullable().defined(), 

    filter             : string().oneOf(
                            ['all', 'read', 'unread', 'favourites', 'wishlist', 'owned']
                        ).defined(),
    
    sort               : string().oneOf(
                            ['title', 'authors', 'newest', 'oldest']
                        ).defined(),
    
    theme              : string().oneOf(
                            ['light', 'dark']
                        ).defined(),
    
    view               : string().oneOf(
                            ['grid', 'list', 'card']
                        ).defined(),
})