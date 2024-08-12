# Discussing the Options for Setting Up a CI/CD Environment

## Linting, Testing and Building 

Typically, linters such as Black, Ruff and Pyflakes are used when developing Python applications. Strictly speaking, Black is a code formatter, which alters spacing and other cosmetic aspects of the code, without changing behavior. 

Choosing Ruff is an easy options, since it requires only little configuration to set up, while being faster than the alternatives, thanks to it being written in Rust. The project is already relatively mature, and in future, Ruff is likely to become the de-facto linting tool for Python.

When discussing testing tools for Python projects, two alternatives come up the most often:
- unittest, a Python standard library option that is a simple solution for unit testing that works without installing any additional modules
- pytest, a flexible testing library for Python, that can produce extremely detailed results and performance metrics

For teams looking to produce high-quality code, pytest is often cited as the best alternative, since it has robust documentation and a wide feature set. A disadvantage of pytest is that test written in it are not supported by other testing libraries, but this drawback is offset by the advantages the library offers. 

As Python is a language interpreted line by line at runtime, there is no need to specify a a build tool. The default interpreter implementation is called CPython, and while some alternatives, such as PyPy exist, it is typically fine to use the default interpreter, unless there are specific performance issues that could be alleviated by changing to a different interpreter.  

## Options besides Jenkins and GitHub Actions

Some alternatives to Jenkins and GitHub Actions include the following:
- GitLab CI/CD
- Travis CI
- CircleCI
- Bamboo

Personal preference and existing code-hosting/project management tool setup provide the basis for choosing the right CI/CD automation tool. 


## Cloud vs. Self-host

The debate on this on is eternal. For high-velocity, small-scale, resource-limited projects, cloud is obvious choice, while self-hosting becomes a relevant option when the starting costs and manpower requirements can justify choosing that option. 