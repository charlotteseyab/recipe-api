import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const localUpload = multer ({
    dest: 'uploads/',
});

// export const recipeIconUpload = multerSaveFilesOrg({
//     storage: multerSaveFilesOrg({
//         apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//         relativePath: '/recipe-api/recipe/*',
//     }),
//     preservePath:true
// });


// Configure multerSaveFilesOrg storage
const saveFilesOrgStorage = multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY, // Your API key from .env
    relativePath: '/recipe-api/recipe/*',             // Path for saved files
    preservePath: true,                              // Optional: preserve directory structure
});

// Pass the storage to multer
export const recipeIconUpload = multer({ storage: saveFilesOrgStorage });
