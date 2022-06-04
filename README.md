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
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

<h3 align="center">HaplotypeVisualizer</h3>

  <p align="center">
    A web-based visualization tool for polyploid haplotypes.
    <br />
    <a href="."><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href=".">View Demo</a>
    ·
    <a href=".">Report Bug</a>
    ·
    <a href=".">Request Feature</a>
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
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#run">Run</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Still under development.

<p align="right"><a href="#top">back to top</a></p>

### Built With

- [React.js](https://reactjs.org/)
- [Cytoscape.js](https://js.cytoscape.org/)
- [FastAPI](https://fastapi.tiangolo.com/)


<p align="right"><a href="#top">back to top</a></p>

<!-- GETTING STARTED -->

## Getting Started

To get `HaplotypeVisualizer` up and running, a few dependencies need to be installed.

### Prerequisites

Make sure to have `pip` and `npm` installed on your machine.

1) Open a terminal in the root directory: `/HaplotypeVisualizer`

2) Install the `haplovis` package and its dependencies:
    ```sh
    pip install .
    ```
3) To verify that the installation was successfull, try to use the CLI:
    ```sh
    haplovis --help
    ```

### Run

This section explains how you can build and start the `HaplotypeVisualizer` web-app.

1) Build `HaplotypeVisualizer` (installs dependencies + builds a production react app)
    ```sh
    haplovis build
    ```

2) Start `HaplotypeVisualizer` (starts a static server and a backend server)
    ```sh
    haplovis start
    ```

    or specify a custom port with the `--port` or `-p` flag:
    ```sh
    haplovis start -p 9999
    ```

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

In the import table on the welcome view, you **must** import files that are located in the `HaplotypeVisualizer/haplovis_back/server/server/server_data` directory. Move your files to this folder or use one of the given data files.

Below is a table of given GFA files with their respective phenotype tables:
| GFA file            | Phenotable                 |
|---------------------|----------------------------|
| `15GFA.gfa`           | `15GFA_phenos.csv`           |
| `50bubbles6paths.gfa` | `50bubbles6paths_phenos.csv` |
| `2kbubbles.gfa`       | NA                         |
| `5kbubbles.gfa`       | NA                         |
| `10kbubbles.gfa`      | NA                         |
| `L3000N4P.gfa`        | NA                         |
| `L100N10P.gfa`        | NA                         |


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

TODO

<p align="right"><a href="#top">back to top</a></p>

<!-- CONTACT -->

## Contact

Ethan Keller - e.keller@student.tudelft.nl

<!-- Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name) -->

<p align="right"><a href="#top">back to top</a></p>

<!-- ACKNOWLEDGMENTS -->

<!-- ## Acknowledgments

- []()
- []()
- []()

<p align="right"><a href="#top">back to top</a></p> -->

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
