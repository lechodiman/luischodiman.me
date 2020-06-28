<h1 align="center">
    Luis Chodiman | Blog
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/fca8b67b-997e-4361-b134-1260aa17e410/deploy-status)](https://app.netlify.com/sites/gracious-booth-453562/deploys)

![Tests](https://github.com/lechodiman/luischodiman.me/workflows/Tests/badge.svg)

This is a site built with [Gatsby.js](https://www.gatsbyjs.org/) using
[gatsby-starter-lumen](https://github.com/alxshelepenok/gatsby-starter-lumen).
To get started:

```bash
yarn
yarn develop
```

### Blog post generator

To maintain the correct blog post structure across all posts I built a command
line interface to automate the process.

To build the package:

```bash
cd generate
yarn build
```

To run the package:

```
cd ..
node generate
```
