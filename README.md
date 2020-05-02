# ![Mars](https://i.ibb.co/RQvDFQP/astronomy.png) Afterman

Export beutiful docs in **Markdown** and **HTML** from postman collection

- :ghost: No Backend
- :wrench: No configuration
- :fire: customize the output of your documentation *(Include Dark mode)*
- :tada: Only HTML, CSS and Javascript (**Quasar Framework power**)

>> Note: The tool covers the basic options of a collection, variables, description, headers, body, routes, as needs arise more things will be added.

## Table of content

- [Rules](#Rules)
- [Get started](#get-started)
- [Tools for build this Web App](#tools)

## Rules

The collection must be exported in version 2.1 and the requests must be organized in folders.

![postman collection demo image](https://i.ibb.co/N37FxYC/Screenshot-2.png)

After this there is nothing else! :smile:

---

## Get started

```bash
$ git clone https://github.com/itsalb3rt/afterman.git
```

### Install the dependencies
```bash
$ npm install
```

#### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
$ quasar dev
```

#### Build the app for production

```bash
$ quasar build
```

---

## Tools

Made with the :heart: and of course with these great tools

- Quasar Framework  https://github.com/quasarframework/quasar
- QMarkdown extension https://github.com/quasarframework/quasar-ui-qmarkdown
- UniqId https://github.com/adamhalasz/uniqid
- Turndown https://github.com/domchristie/turndown
