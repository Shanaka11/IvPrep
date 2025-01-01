# IV Prep - Technical Interview Quiz App

[Live Demo](https://iv-prep.vercel.app/)

## Overview

IV Prep is a quiz application designed to help software engineers prepare for technical interviews. Users can select topics from a range of technical subjects, generate quizzes with random questions, and engage with the community by providing answers or comments to these questions. The platform is tailored for engineers of various seniorities, ensuring an inclusive and effective preparation experience.

## Features

### Current Features:
- **Topic Selection:** Choose from a set of technical topics to generate quizzes.
- **Randomized Quizzes:** Get 10 random questions from the question bank.
- **Community-Driven Content:** Questions are provided by users, who can also submit answers and comments.

### Planned Features:
- **Upvote/Downvote System:**
  - Ability to upvote or downvote questions and comments.
- **Difficulty Rating:**
  - Assign difficulty ratings to questions.
  - Generate quizzes based on selected difficulty levels.

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) with [ShadCN](https://shadcn.dev/) and [Tailwind CSS](https://tailwindcss.com/).
- **Backend:** [Supabase](https://supabase.com/) for database and authentication.
- **Database ORM:** [Drizzle](https://orm.drizzle.team/).

## Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Shanaka11/IvPrep.git
   cd iv-prep
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env.local` file in the root directory and add the required environment variables for Supabase and other configurations.
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<key>
   CLERK_SECRET_KEY=<key>
   DATABASE_URL=<key>
   ```

4. **Run the Application Locally:**
   ```bash   
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

5. **Build for Production:**
   ```bash
   npm run build
   ```

## Contributing

We welcome contributions to improve IV Prep! Here are some ways to get involved:

- Submit issues for bugs or feature requests.
- Fork the repository, make changes, and open a pull request.
- Provide new technical interview questions and answers.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, please reach out to [shanakaabeysinghe@gmail.com].