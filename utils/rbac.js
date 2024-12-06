export const permissions = [
    {
        role: "chef",
        actions: [
            'create_recipe',
            'update_recipe',
            'delete_recipe',
            'read_recipe',
            'get_all_recipes',
            'get_recipe',
            'get_profile',
            'update_profile',
        ],
    },
    {
        role: "user",
        actions: [
            'read_recipe',
            'update_profile',
            'get_profile',
            'comment'
            
        ],
    },
]