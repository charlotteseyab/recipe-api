import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

// export const localUpload = multer({
//     dest: 'uploads/'
// });

export const recipeIconUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/recipe-api/recipe/*'
    }),
    preservePath: true
})


