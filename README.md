<div id="top"></div>

<!--
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ethan-keller/HaplotypeVisualizer">
    <img src="img/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">HaplotypeVisualizer</h3>

  <p align="center">
    A web-based visualization tool for polyploid haplotypes.
    <br />
    <br />
    <a href="https://github.com/ethan-keller/HaplotypeVisualizer/pulls">Report Bug</a>
    ·
    <a href="https://github.com/ethan-keller/HaplotypeVisualizer/pulls">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#cli">CLI</a></li>
        <li><a href="#run">Run</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

HaplotypeVisualizer is a graph-based web-app for polyploid haplotype visualization. It interactively visualizes the differences between haplotypes and includes bookmarking, pre-processing and phenotype specific views.

<p align="right"><a href="#top">back to top</a></p>

### Built With

- [React.js](https://reactjs.org/)
- [Cytoscape.js](https://js.cytoscape.org/)
- [FastAPI](https://fastapi.tiangolo.com/)

<p align="right"><a href="#top">back to top</a></p>

<!-- GETTING STARTED -->

## Getting Started

> ### Tip
>
> It is recommended to use a virtual environment managers such as [Conda](https://docs.conda.io/en/latest/) or [venv](https://docs.python.org/3/library/venv.html) to avoid package versioning problems.

> ### Important:
>
> Make sure to have `pip` and `nodejs` installed on your machine!

Start by cloning this repository to your machine. E.g., like so:

```sh
git clone https://github.com/ethan-keller/HaplotypeVisualizer
```

For other ways to clone a repository to your machine: [GitHub Cloning Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

### CLI

To get `HaplotypeVisualizer` up and running, you need to install the `haplovis` CLI (Command Line Interface).

1. Open a terminal in the root directory: `/HaplotypeVisualizer`

2. Install the `haplovis` package and its dependencies:
   ```sh
   pip install .
   ```
3. To verify that the installation was successfull, try to use the `haplovis` CLI:
   ```sh
   haplovis --help
   ```

### Run

This section explains how you can build and start the `HaplotypeVisualizer` web-app.

1. Build `HaplotypeVisualizer` (installs dependencies + builds a production react app)

   ```sh
   haplovis build
   ```

2. Start `HaplotypeVisualizer` (starts a static server and a backend server)

   ```sh
   haplovis start
   ```

   or specify an optional port (`--port` / `-p`) and/or your data folder:

   ```sh
   haplovis start -p 9999 -f ./my-data-folder
   ```

   > ### Important:
   >
   > - Default port: `3000`
   > - Default data folder: `/data`

<p align="right"><a href="#top">back to top</a></p>

<!-- ### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = "ENTER YOUR API";
   ```

<p align="right"><a href="#top">back to top</a></p> -->

## Usage

In the import table on the welcome view, you **must** import files that are located in your previously specified data folder (as explained in <a href="#run">the <b>Run</b> section</a>). If you did not specify a folder, the default one will be used which is the `HaplotypeVisualizer/data` directory. Move your files to this folder or use one of the provided data files (already located in this directory).

Below is a table of the given demo GFA files with their respective phenotype tables:
| GFA file | Phenotable |
|---------------------|----------------------------|
| `15GFA.gfa` | `15GFA_phenos.csv` |
| `50bubbles6paths.gfa` | `50bubbles6paths_phenos.csv` |
| `demo1.gfa` | `demo1.csv` |
| `demo2.gfa` | `demo2.csv` |
| `2kbubbles.gfa` | NA |
| `5kbubbles.gfa` | NA |
| `10kbubbles.gfa` | NA |
| `L3000N4P.gfa` | NA |
| `L100N10P.gfa` | NA |

<p align="right"><a href="#top">back to top</a></p>

<!-- CONTRIBUTING -->

<!-- ## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right"><a href="#top">back to top</a></p> -->

<!-- LICENSE -->

## License

[BSD 3-clause](https://github.com/ethan-keller/HaplotypeVisualizer/blob/main/LICENSE)

<p align="right"><a href="#top">back to top</a></p>

<!-- CONTACT -->

## Contact

Ethan Keller - e.keller@student.tudelft.nl

<p align="right"><a href="#top">back to top</a></p>

## Acknowledgments

I'd like to thank [Dr. Thomas Abeel](https://www.abeel.be/), [Lucas van Dijk](https://lucasvandijk.nl/) and the [AbeelLab](https://github.com/AbeelLab) team for guiding and assisting me throughout this project. Additionally, [Colin Diesh](https://github.com/cmdcolin) and [Bandage](https://rrwick.github.io/Bandage/) were a great source of inspiration.

<p align="right"><a href="#top">back to top</a></p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

<!-- [contributors-shield]: https://img.shields.io/github/contributors/ethan-keller/HaplotypeVisualizer.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png -->
