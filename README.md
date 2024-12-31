# 📝 FormFlow - Drag and Drop Form Builder  

A **Next.js** application that allows users to create and customize beautiful forms with a drag-and-drop interface. Powered by cutting-edge technologies like **Dnd-kit**, **Prisma**, and **Vercel PostgreSQL**, this project offers seamless form creation, sharing, and submission tracking.  

## 🌟 Features  

- **Responsive Design**: Works perfectly on all devices.  
- **Drag-and-Drop Form Designer**: Effortlessly design forms with:  
  - **Layout Fields**: Title, Subtitle, Spacer, Separator, Paragraph.  
  - **Form Fields**: Text, Number, Select, Date, Checkbox, Textarea.  
- **Customization**: Easily add and customize new fields.  
- **Form Preview Dialog**: Preview your forms in real-time.  
- **Share Form URL**: Share forms with others via a unique link.  
- **Form Submission & Validation**: Ensure valid and clean data submission.  
- **Form Stats**: Track form visits and submissions in real-time.  

---

## 🚀 Tech Stack  

- **Framework**: [Next.js](https://nextjs.org/) with App Router.  
- **Drag-and-Drop**: [Dnd-kit](https://dndkit.com/).  
- **Styling**: [TailwindCSS](https://tailwindcss.com/) and [ShadCN UI](https://shadcn.dev/).  
- **Database**: [Vercel PostgreSQL](https://vercel.com/docs/storage/vercel-postgres).  
- **ORM**: [Prisma](https://www.prisma.io/).  
- **Server Actions**: Built-in support with Next.js for seamless data handling.  

---

## 🛠️ Installation  

1. **Clone the Repository**:  
   ```bash  
   git clone https://github.com/rajatsachdeva31/FormFlow.git  
   cd form-builder-drag-drop  
   ```  

2. **Install Dependencies**:  
   ```bash  
   npm install  
   ```  

3. **Setup Environment Variables**:  
   Create a `.env` file in the root directory and add the following variables:  
   ```env  
   DATABASE_URL=your_vercel_postgres_connection_string  
   NEXT_PUBLIC_BASE_URL=http://localhost:3000  
   ```  

4. **Setup Prisma**:  
   ```bash  
   npx prisma migrate dev --name init  
   npx prisma generate  
   ```  

5. **Run the Development Server**:  
   ```bash  
   npm run dev  
   ```  
   Access the app at [http://localhost:3000](http://localhost:3000).  

---

## 📦 Deployment  

1. **Deploy on Vercel**:  
   - Push your code to a GitHub/GitLab/Bitbucket repository.  
   - Connect the repo to [Vercel](https://vercel.com/).  
   - Add the required environment variables in the Vercel dashboard.  

2. **Database Setup**:  
   - Use [Vercel PostgreSQL](https://vercel.com/docs/storage/vercel-postgres) for production.  

3. **Prisma Migrations**:  
   Run migrations on your production database:  
   ```bash  
   npx prisma migrate deploy  
   ```  

---

## 🌐 Live Demo  

Check out the live demo of the project: [Live Demo](https://tryformflow.vercel.app/) 

---

## 🤝 Contributing  

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/rajatsachdeva31/FormFlow/issues).  

---

## 📜 License  

This project is licensed under the [MIT License](LICENSE).  

---

## 👩‍💻 Author  

Built with ❤️ by [Rajat Sachdeva](https://github.com/rajatsachdeva31).  
