# Developer Guide: Marketing & Login Integration Hand-off


## 1. Where to Find Your Files Now

To prevent naming conflicts with the dashboard's layout elements (like `Navbar.jsx` or `Footer.jsx`), we organized your pages and components under dedicated directories in the project workspace:

### Components & CSS Modules
* **Navbar**:
  * JS: [`src/components/marketing/navbar/Navbar.jsx`](file:///z:/Xebia_LMS-main/src/components/marketing/navbar/Navbar.jsx)
  * CSS: [`src/components/marketing/navbar/Navbar.module.css`](file:///z:/Xebia_LMS-main/src/components/marketing/navbar/Navbar.module.css)
* **Footer**:
  * JS: [`src/components/marketing/footer/Footer.jsx`](file:///z:/Xebia_LMS-main/src/components/marketing/footer/Footer.jsx)
  * CSS: [`src/components/marketing/footer/Footer.module.css`](file:///z:/Xebia_LMS-main/src/components/marketing/footer/Footer.module.css)
* **Landing Page**:
  * JS: [`src/components/marketing/home/Home.jsx`](file:///z:/Xebia_LMS-main/src/components/marketing/home/Home.jsx)
  * CSS: [`src/components/marketing/home/Home.module.css`](file:///z:/Xebia_LMS-main/src/components/marketing/home/Home.module.css)
* **FAQ**:
  * JS: [`src/components/marketing/faq/FAQ.jsx`](file:///z:/Xebia_LMS-main/src/components/marketing/faq/FAQ.jsx)
  * CSS: [`src/components/marketing/faq/FAQ.module.css`](file:///z:/Xebia_LMS-main/src/components/marketing/faq/FAQ.module.css)
  * Data: [`src/components/marketing/faq/faqData.js`](file:///z:/Xebia_LMS-main/src/components/marketing/faq/faqData.js)
* **Contact Form**:
  * JS: [`src/components/marketing/contact/ContactForm.jsx`](file:///z:/Xebia_LMS-main/src/components/marketing/contact/ContactForm.jsx)
  * CSS: [`src/components/marketing/contact/ContactForm.module.css`](file:///z:/Xebia_LMS-main/src/components/marketing/contact/ContactForm.module.css)
* **Login & Sign Up Forms**:
  * JS: [`src/components/login/LoginForm.jsx`](file:///z:/Xebia_LMS-main/src/components/login/LoginForm.jsx)
  * CSS: [`src/components/login/LoginForm.module.css`](file:///z:/Xebia_LMS-main/src/components/login/LoginForm.module.css)
  * New JS: [`src/components/login/SignUpForm.jsx`](file:///z:/Xebia_LMS-main/src/components/login/SignUpForm.jsx)
  * New CSS: [`src/components/login/SignUpForm.module.css`](file:///z:/Xebia_LMS-main/src/components/login/SignUpForm.module.css)

### Router Pages & Layout Wrappers
* **Layouts**: [`src/layouts/MarketingLayout.jsx`](file:///z:/Xebia_LMS-main/src/layouts/MarketingLayout.jsx) & [`src/layouts/AuthLayout.jsx`](file:///z:/Xebia_LMS-main/src/layouts/AuthLayout.jsx)
* **Pages**: [`src/pages/HomePage.jsx`](file:///z:/Xebia_LMS-main/src/pages/HomePage.jsx), [`src/pages/FAQPage.jsx`](file:///z:/Xebia_LMS-main/src/pages/FAQPage.jsx), [`src/pages/ContactPage.jsx`](file:///z:/Xebia_LMS-main/src/pages/ContactPage.jsx), [`src/pages/LoginPage.jsx`](file:///z:/Xebia_LMS-main/src/pages/LoginPage.jsx), [`src/pages/SignUpPage.jsx`](file:///z:/Xebia_LMS-main/src/pages/SignUpPage.jsx)

### Static Media Assets
All background images and logos have been copied to:
* `/public/Contactus.jpg`
* `/public/Login.png`
* `/public/home.jpg`
* `/public/logo-light.png`

---

## 2. Key Changes Made to Your Code

We wanted to preserve your layout, animations, and typography changes exactly as you designed them while integrating them with our routing structure and dashboard theme provider. Here are the core changes we introduced:

### A. Style Scoping & Variable Isolation
Your global custom colors (like `--text-primary`, `--background`, and `--primary-color`) defined on `:root` in your `index.css` collided with variables of the same name in the dashboard theme.
* **Solution:** We scoped all of your marketing theme styles inside a `.marketing-theme` class container in our global [`src/index.css`](file:///z:/Xebia_LMS-main/src/index.css).
* **Impact:** Your pages are wrapped in this class, so your CSS module styles read the correct values without bleeding into or breaking the dashboard colors.

### B. Theme Switcher Synchronization
Your code checks the `data-theme` attribute on `document.documentElement` to transition to dark mode (using `[data-theme="dark"]`), whereas the dashboard checks for a `.dark` class.
* **Solution:** We updated the global [`ThemeContext.jsx`](file:///z:/Xebia_LMS-main/src/context/ThemeContext.jsx) to set **both** structures simultaneously:
  ```javascript
  document.documentElement.classList.add('dark');
  document.documentElement.setAttribute('data-theme', 'dark');
  ```
* **Impact:** Toggling light/dark mode using the button in either your Navbar or the Dashboard Sidebar updates the theme globally for all layouts.

### C. Active Login State in `LoginForm.jsx`
We connected your presentation form to a React state and our new mock authentication layer:
* **Imports:** Added `useState` and the `useAuth()` custom hook.
* **Form Action:** Input values bind to state, and form submissions trigger `login(email, password)`.
* **Feedback:** Validation errors are dynamically rendered in red above the form inputs. Successful logins redirect to `/dashboard`.
* **Sign Up Nav:** Added a link redirecting new users to `/signup`.

### D. Upgraded Route Guarding
Created [App.jsx](file:///z:/Xebia_LMS-main/src/App.jsx) checks:
* If a logged-in user tries to visit `/login` or `/signup`, they are redirected to `/dashboard`.
* If a guest tries to access `/dashboard/*` without logging in, they are redirected back to `/login`.
* The root path `/` now redirects to your landing page `/home`.

---

## 3. How to Make Further Changes

If you want to continue styling, developing, or changing layouts:

### To Customize Visual Styles & CSS
You can edit the `.module.css` files directly (e.g. `Home.module.css` or `LoginForm.module.css`). 
* If you need to add new theme-level CSS variables, declare them inside the `.marketing-theme` block at the bottom of [`src/index.css`](file:///z:/Xebia_LMS-main/src/index.css).
* If you want to change custom fonts or scrollbars, they are loaded and managed in [`src/index.css`](file:///z:/Xebia_LMS-main/src/index.css).

### To Test Different Dashboard Layout Roles
Our mock credentials allow testing different dynamic dashboards:
* **Superadmin:** `superadmin@xebia.com` / `superadmin123`
* **Admin:** `admin@xebia.com` / `admin123`
* **Trainer:** `trainer@xebia.com` / `trainer123`
* **Student:** `student@xebia.com` / `student123`

### To Connect to a Real Authentication API
When the backend endpoints are ready, you can configure them inside [`src/context/AuthContext.jsx`](file:///z:/Xebia_LMS-main/src/context/AuthContext.jsx):
1. Locate the `login` function.
2. Replace the local `MOCK_USERS` and `localStorage` checks with an asynchronous HTTP POST request to your backend (e.g. `/api/auth/login`).
3. Store the returned cookie/token, update `currentUser`, and you're good to go!
