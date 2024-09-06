![ A website with the title "Sanju's internet space" and navigation links for "home", "writing", "thoughts", and "ships".](https://github.com/Spikeysanju/sanju.sh/assets/23400022/ff3120ee-281b-4607-995e-bc2e8f9edef6)

# 🌐 sanju's – internet space
hey! this is my personal corner on the web where I share my thoughts, ideas, and projects. feel free to explore and contact me if you have any questions or just want to chat. 

## 📖 about project
this is a simple personal website i built using [astro](https://astro.build/), a static site generator. i chose Astro for its speed, flexibility, and ease of use. i hope you like the site!


## ✨ features
- **writings**: a collection of my blog posts and articles
- **thoughts**: a place for me to share my random thoughts and ideas (more like tweets or quotes)
- **ships**: a list of projects that i've worked on or contributed to (github style commit graph will be generated based on the things i've worked on)

## 🛠️ tech stack
- **astro**: static site generator
- **tailwindcss**: utility-first css framework for rapid prototyping
- **markdown**: for writing content in a simple and easy-to-read format
- **typescript**: for type-checking and better code quality 
- **biome**: Format, lint, and more in a fraction of a second.
- **cloudflare pages**: for hosting the site and continuous deployment

## 🎨 design
- i wanted to keep the design simple and clean. i used a monochrome color scheme with a pop of color for the accent. 
- i also used a lot of whitespace to make the content easy to read and navigate. 
- i'm a big fan of minimalism and KISS (keep it simple, stupid) and i think it works well for a personal website like this. 
- i hope you like the design as much as i do!

## 🔧 environment variables
To add analytics to your site, you can use Umami and Clarity. you will need to add the following environment variables to your `.env` file:

```plaintext
# Umami Analytics
UMAMI_WEBSITE_ID=your_umami_website_id
UMAMI_TRACKING_URL=your_umami_tracking_url

# Clarity Analytics
CLARITY_TRACKING_ID=your_clarity_tracking_id
```

if you don't want to use analytics, you can remove the analytics code from the [src/components/seo/base-head.astro](https://github.com/Spikeysanju/sanju.sh/blob/main/src/components/seo/base-head.astro) file and remove the umami and clarity scripts.

## 🤝 contributing
if you have ideas or suggestions, feel free to open an issue or submit a pull request. i'm open to collaborations and contributions.

## 📬 contact
you can reach me at work@sanju.sh or on twitter. don't hesitate to get in touch!

## 📜 license
this project is open source under the Apache License 2.0. you're welcome to use the code for your own projects. if you do, a shoutout would be appreciated but it's not required.