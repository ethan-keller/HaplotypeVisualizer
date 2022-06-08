import os
import webbrowser
from pathlib import Path
from typing import List, Optional
import typer
from haplovis.layout import Layout
from haplovis.kdtree import KDTree
from haplovis.serialization import PickleSerializer
from haplovis.gfa import Gfa
from haplovis import folder_locations
import subprocess


CLI = typer.Typer(add_completion=False, context_settings={"help_option_names": ["-h", "--help"]})

# Static variables
VERSION = "0.1.0"
VALID_GRAPH_EXTENSIONS = [".gfa"]
VALID_LAYOUT_EXTENSIONS = [".pickle"]
DEFAULT_PORT = 3000
DEFAULT_FOLDER = Path("./data")
BUILD_COMMAND = "npm run build"
INSTALL_DEPENDENCIES_COMMAND = "npm install && cd ../haplovis && npm install"
START_STATIC_SERVER_COMMAND = "npx serve -s ./server/static"
START_BACKEND_COMMAND = "uvicorn server.main:server"


def path_validation_callback(param: typer.CallbackParam, path: Path):
    valid_extensions = VALID_GRAPH_EXTENSIONS if param.name == "gfas" else VALID_LAYOUT_EXTENSIONS

    # validation
    if path.suffix not in valid_extensions:
        styled_err_explanation = typer.style(f"Invalid file extension {path.suffix}", fg=typer.colors.RED)
        raise typer.BadParameter(styled_err_explanation)

    return path


def paths_validation_callback(param: typer.CallbackParam, paths: List[Path]):
    # At least one path must be given
    if len(paths) == 0:
        raise typer.BadParameter("No gfa paths were given")

    # validation
    for path in paths:
        path_validation_callback(param, path)

    return paths


def version_callback(version: Optional[bool]):
    if version:
        typer.echo(f"CLI version: {VERSION}")
        raise typer.Exit()


@CLI.command()
def layout(
    gfas: List[Path] = typer.Argument(
        ...,
        exists=True,
        file_okay=True,
        dir_okay=False,
        resolve_path=True,
        case_sensitive=True,
        callback=paths_validation_callback,
    ),
    folder: Path = typer.Option(DEFAULT_FOLDER, "--folder", "-f", file_okay=False,
        dir_okay=True, resolve_path=True, case_sensitive=True),
    verbose: bool = typer.Option(True, "--verbose/--no-verbose", "-v/-V"),
):
    """
    Generate multiple layout files
    """
    for gfa in gfas:
        try:
            if verbose:
                typer.echo(f"Searching for data folder at: {folder} ...")

            if not folder.exists():
                if verbose:
                    typer.echo(f"Could not find data folder. Creating {folder} ...")
                os.mkdir(folder)

            hidden_out_folder = folder.joinpath(".out/")

            if verbose:
                typer.echo(f"Searching for hidden output folder at: {hidden_out_folder} ...")

            if not hidden_out_folder.exists():
                if verbose:
                    typer.echo(f"Could not find hidden output folder. Creating {hidden_out_folder} ...")
                os.mkdir(hidden_out_folder)

            if verbose:
                typer.echo(f"Creating layout for {str(gfa)}")
                typer.echo("Computing layout...")
            layout = Layout.compute_layout(gfa, hidden_out_folder)
            if verbose:
                typer.echo(f"Creating index tree for layout...")
            kdtree = KDTree.create_tree_from_layout(layout)
            gfa_hash = Gfa.get_gfa_hash(gfa)
            if gfa_hash:
                if verbose:
                    typer.echo("Serializing index tree...")
                index_file_path = hidden_out_folder.joinpath(Path(f"{gfa_hash}.pickle")).resolve()
                out_path = PickleSerializer.serialize(kdtree, index_file_path)
                typer.secho(f"Successfully computed layout for {gfa} --> Stored at {str(out_path)}", fg="green")
            else:
                typer.secho(f"Could not compute layout for {gfa}", fg="red")
        except Exception as e:
            typer.secho(f"Unexpected error occured: [{e}]", fg="red")


@CLI.command()
def see_layout(
    layout: Path = typer.Argument(
        ...,
        exists=True,
        file_okay=True,
        dir_okay=False,
        resolve_path=True,
        case_sensitive=True,
        callback=path_validation_callback,
    )
):
    """
    Visualize a layout file
    """
    # visualization of index tree
    kdtree: KDTree = PickleSerializer.deserialize(from_file=Path(layout))
    kdtree.print()


def error_echo(explanation: str):
    typer.secho(explanation, fg="red")
    typer.echo("Terminating command...")

@CLI.command()
def build():
    """
    Install needed dependencies and build HaplotypeVisualizer
    """
    # install deps
    try:
        typer.echo("Installing dependencies...")
        subprocess.run(INSTALL_DEPENDENCIES_COMMAND, cwd="./src/frontend", shell=True)

        # check dependencies
        frontend_deps_exists = Path("./src/frontend/node_modules").exists()
        graph_layout_deps_exists = Path("./src/haplovis/node_modules").exists()
        if (not (frontend_deps_exists and graph_layout_deps_exists)):
            error_echo("Failed installing dependencies. Some dependencies are missing")
            return
        else:
            typer.secho("Done installing dependencies!", fg="green")
    except Exception:
        error_echo("Could not install dependencies")
        return   

    # build react to static folder
    try:
        typer.echo("Building HaplotypeVisualizer...")
        subprocess.run(BUILD_COMMAND, cwd="./src/frontend", shell=True)

        # check build
        static_dir_exists = Path("./src/haplovis/server/static").exists()
        if (not static_dir_exists):
            error_echo("HaplotypeVisualizer was not built correctly")
            return
        else:
            typer.secho("Done building HaplotypeVisualizer!", fg="green")
    except Exception:
        error_echo("Could not build HaplotypeVisualizer")
        return

@CLI.command()
def start(
    folder: Path = typer.Option(
        DEFAULT_FOLDER,
        "--folder",
        "-f",
        file_okay=False,
        dir_okay=True,
        resolve_path=True,
        case_sensitive=True,
    ),
    port: int = typer.Option(DEFAULT_PORT, "--port", "-p")
):
    """
    Start HaplotypeVisualizer
    """
    # start static server
    try:
        typer.echo("Starting static server...")
        p = subprocess.Popen(f"{START_STATIC_SERVER_COMMAND} -p {port}", cwd="./src/haplovis", shell=True, stdout=subprocess.PIPE)

        # open web browser
        webbrowser.open(f"http://localhost:{port}")

        # check build
        index_file_exists = Path("./src/haplovis/server/static/index.html").exists()
        if (not index_file_exists):
            error_echo("Cannot start HaplotypeVisualizer because no index.html file was found in the static folder")
            return
        else:
            typer.secho("Successfully started the static server!", fg="green")
    except Exception:
        error_echo("Could not start the static server")
        return


    # start backend
    try:
        typer.echo("Starting backend...")
        typer.echo(f"Searching for data folder at: {folder} ...")
        if not folder.exists():
            typer.echo(f"Could not find data folder. Creating {folder} ...")
            os.mkdir(folder)

        hidden_out_folder = folder.joinpath(".out/")
        typer.echo(f"Searching for hidden output folder at: {hidden_out_folder} ...")
        if not hidden_out_folder.exists():
            typer.echo(f"Could not find hidden output folder. Creating {hidden_out_folder} ...")
            os.mkdir(hidden_out_folder)

        folder_locations.data_folder = folder
        folder_locations.out_folder = hidden_out_folder

        subprocess.run(START_BACKEND_COMMAND, cwd="./src/haplovis", shell=True)
        typer.secho("Successfully started the backend!", fg="green")
    except Exception:
        error_echo("Could not start the backend")
        return



@CLI.callback()
def main(version: Optional[bool] = typer.Option(None, "--version", is_eager=True, callback=version_callback)):
    """
    Command Line Interface (CLI) for HaplotypeVisualizer.

    Offers:\n
        - layout file generation/visualization\n
        - web-app (HaplotypeVisualizer) startup\n
    """
    pass


if __name__ == "__main__":
    CLI()
