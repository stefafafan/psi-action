# Contribution Guide

Feel free to open issues here (https://github.com/stefafafan/psi-action/issues) or contributing with Pull Requests.
When opening up Pull Requests, make sure you follow the following flow:

1. Fork the repository from https://github.com/stefafafan/psi-action/fork
1. Create your feature branch (e.g. `git switch -c your-feature`)
1. Commit and push your changes.
1. Make sure tests pass on your machine.

## Tips on local development

Make sure you have the [correct version of Node.js](https://github.com/stefafafan/psi-action/blob/main/.tool-versions) installed, as well as the dependencies.

```bash
$ npm install
```

Build and format.

```bash
$ npm run build && npm run format && npm run lint
```

Run the tests. These should pass.

```bash
$ npm test
```

Package for distribution.

```bash
$ npm package
```

Continuous Integration will fail if you do not push the diff from building and packaging.
