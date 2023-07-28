# Super Web App Template

**Fast**, **Type Safe**, **Efficient**, **Modern**, **EdgeReady** web app template.

## What is this?

This is a template for making modern, fast, eficient web apps. It uses the following technologies:
 
 - Astro [astro.build](https://astro.build/)

 - Tailwind CSS [tailwindcss.com](https://tailwindcss.com/)

 - Drizzle ORM [orm.drizzle.team](https://orm.drizzle.team/)

 - openid-client [www.npmjs.com/package/openid-client](https://www.npmjs.com/package/openid-client)

 - React [reactjs.org](https://reactjs.org/)

 - React Router [reactrouter.com](https://reactrouter.com/)

 - TRPC [trpc.io](https://trpc.io/)

 - React Query [tanstack.com/query/latest/](https://tanstack.com/query/latest/)

 - MUI [mui.com](https://mui.com/) (optional)

## Why?

This template essentialy is a multi-page app and a single page app combined with many things included.

Astro allows you to create a multi-page app, where each page is a separate HTML file. This is great for SEO and performance. Also allows you to integrate react and others ui frameworks in a very easy way.

Multi-page apps are great, but they are not great for being a fast feeling modern application. Rendering HTML and loading the full page every time you change the view is not great for user experience. Also, you need many database calls and server functions to render the page. This template allows you to do this and provide tools for doing it, but also gives you the tools to create a fast single page app.

Modern web frameworks use the server for many things. For example, loading initial data for each route you navigate, rendering server components html. Many times, it is necessary to load data from database and doing a lot of things just to load new route/page/view. They are fast but not for every situation.

Single page apps, when loaded, require the least amount of server interactions. Depending less on the server can make things faster, more efficient and cheaper. You can leverage many capabilities of the browser that improves the speed and user experience of your app. For example, you can keep data loaded locally between pages, you can use animations, you have more control over the navigation and the local history. It makes the experience closer to a native app. Also, using moder features like lazy loading react components you can get a great initial load time with a not that big initial bundle size.

For a big project your will probably need a landing page, information and support pages, and a complex interactive fast app. This template lets you create typical pages with zero JavaScript and SEO friendly and a complex single page application with react and a backend.

For example, if you are building a blog or an ecommerce you will need many SEO friendly light weight html only pages and a powerful and fast control panel to manage your data. This panel probably requires to be authenticated and to be able to navigate it fast. This template allows you to create this complex app aside a full featured multi page app with server side rendering, react, authentications and more.

It’s true that next.js already has many of these features. This is an alternative. It its architecture differently and with lower-level access to things. You can probably do most things with next. Remember that next doesn’t allow you to render html pages with zero JavaScript and doesn’t expose access to the router. And many other limitations.