require('dotenv').config();
const fs = require('fs');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const templatePath = path.resolve(__dirname, '../src/environments/environment.template.ts');
const outputPath = path.resolve(__dirname, `../src/environments/environment.ts`);
const template = fs.readFileSync(templatePath, 'utf8');

const result = template
    .replace('__PROJECT_ID__', process.env.PROJECT_ID)
    .replace('__DATABASE_ID__', process.env.DATABASE_ID)
    .replace('__COMMENTS_COLLECTION_ID__', process.env.COMMENTS_COLLECTION_ID)
    .replace('__REPORTS_COLLECTION_ID__', process.env.REPORTS_COLLECTION_ID)
    .replace('__USER_GROUP_ID__', process.env.USER_GROUP_ID)
    .replace('__ADMINS_GROUP_ID__', process.env.ADMINS_GROUP_ID)
    .replace('__STORAGE_ID__', process.env.STORAGE_ID)
    .replace('__STORAGE_COLLECTION_ID__', process.env.STORAGE_COLLECTION_ID)
    .replace('__AVATAR_COLLECTION_ID__', process.env.AVATAR_COLLECTION_ID);

fs.writeFileSync(outputPath, result);
console.log(`Generated ${isProd ? 'production' : 'development'} environment file.`);