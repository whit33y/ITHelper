# ITHelper 💻

**ITHelper** is a responsive web app built to simplify the management of report tickets between users and administrators.

**Users** can easily submit a report with a title, category, priority, description, and photos. Each report has a comment section where users can communicate with administrators.

**Administrators** have access to all reports and can interact with users via the comment section. They are also able to assign reports to responsible colleagues and edit priorities and categories as needed.

## Tech/Framework

- Angular
- TypeScript
- Tailwind
- Appwrite
- Prettier

## Installation and live preview

**Live preview**
[Live](https://it-helper-hkiw.vercel.app/login)

1. Clone the project:
   ```sh
   git clone https://github.com/whit33y/ITHelper.git
   ```
2. Install packages:
   ```sh
   npm install
   ```
3. Register/login to Appwrite:
   - Create an account or login via GitHub on [Appwrite](https://appwrite.io/).
4. Create a project and database in Appwrite:
   - Create a new project, name it, and add a database.
5. Add collections in Appwrite DB:
   - Create collections:
6. Add attributes to :

7. Add attributes to :

8. Edit `environment_edit.ts`:
   - Pass your API key, DB ID, and collection IDs, then rename it to `environment.ts`.
9. Start the project:
   ```sh
   npm start
   ```
   - Navigate to `http://localhost:4200/` or another port if applicable.
