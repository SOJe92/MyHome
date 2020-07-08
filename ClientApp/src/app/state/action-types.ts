export default {
    app: {
        account: {
            overview: {
                hide: 'APP_ACCOUNT_OVERVIEW_HIDE',
                show: 'APP_ACCOUNT_OVERVIEW_SHOW',
            },
        },
        menu: {
            add: 'APP_MENU_ADD',
            create: 'APP_MENU_CREATE',
            delete: 'APP_MENU_DELETE',
            read: 'APP_MENU_READ',
            item: {
                add: 'APP_MENU_ITEM_ADD',
                create: 'APP_MENU_ITEM_CREATE',
                delete: 'APP_MENU_ITEM_DELETE',
                read: 'APP_MENU_ITEM_READ',
                update: 'APP_MENU_ITEM_UPDATE',
            },
            update: 'APP_MENU_UPDATE',
        },
        user : {
            current : {
                create: 'APP_USER_CURRENT_CREATE',
                read: 'APP_USER_CURRENT_READ',
                set: 'APP_USER_CURRENT_SET',
            },
        },
    },
    entities: {
        menu: {
            item: {
                read: 'ENTITIES_MENU_ITEM_READ',
            },
            read: 'ENTITIES_MENU_READ',
        }
    }
}