import webbrowser
from pathlib import Path
from typing import List, Optional
import typer
from haplovis.layout import Layout
from haplovis.kdtree import KDTree
from haplovis.serialization import PickleSerializer
from haplovis.gfa import Gfa
import subprocess

CLI = typer.Typer(add_completion=False)

# Static variables
VERSION = "0.1.0"
VALID_GRAPH_EXTENSIONS = [".gfa"]
VALID_LAYOUT_EXTENSIONS = [".pickle"]
DEFAULT_OUTPUT_DIR = Path("./src/haplovis/out").resolve()
DEFAULT_PORT = 3000
BUILD_COMMAND = "npm run build"
INSTALL_DEPENDENCIES_COMMAND = "npm install && cd ../haplovis/graph_layout && npm install"
START_STATIC_SERVER_COMMAND = "npx serve -s ./server/static"
START_BACKEND_COMMAND = "uvicorn server.main:server"


def path_validation_callback(param: typer.CallbackParam, paths: List[Path]):
    valid_extensions = VALID_GRAPH_EXTENSIONS if param.name == "gfas" else VALID_LAYOUT_EXTENSIONS

    # At least one path must be given
    if len(paths) == 0:
        raise typer.BadParameter("No gfa paths were given")

    # validation
    for path in paths:
        if path.suffix not in valid_extensions:
            styled_err_explanation = typer.style(f"Invalid file extension {path.suffix}", fg=typer.colors.RED)
            raise typer.BadParameter(styled_err_explanation)

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
        callback=path_validation_callback,
    ),
    output_folder: Path = typer.Option(DEFAULT_OUTPUT_DIR, "--output", "-o", dir_okay=True, case_sensitive=True),
    verbose: bool = typer.Option(True, "--verbose", "-v"),
):
    """
    Generate multiple layout files
    """
    for gfa in gfas:
        try:
            if verbose:
                typer.echo(f"Creating layout for {str(gfa)}")
                typer.echo("Computing layout...")
            layout = Layout.compute_layout(gfa, output_folder)
            if verbose:
                typer.echo(f"Creating index tree for layout...")
            kdtree = KDTree.create_tree_from_layout(layout)
            gfa_hash = Gfa.get_gfa_hash(gfa)
            if gfa_hash:
                if verbose:
                    typer.echo("Serializing index tree...")
                index_file_path = output_folder.joinpath(Path(f"{gfa_hash}.pickle")).resolve()
                out_path = PickleSerializer.serialize(kdtree, index_file_path)
                typer.secho(f"Successfully computed layout for {gfa} --> Stored at {str(out_path)}", fg="green")
            else:
                typer.secho(f"Could not compute layout for {gfa}", fg="red")
        except Exception as e:
            typer.secho(f"Unexpected error occured: [{e}]", fg="red")


@CLI.command()
def see_layout(
    layouts: List[Path] = typer.Argument(
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
    # TODO: fix type of 'layouts'
    kdtree: KDTree = PickleSerializer.deserialize(from_file=Path(layouts[0]))
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
        graph_layout_deps_exists = Path("./src/haplovis/graph_layout/node_modules").exists()
        if (not (frontend_deps_exists and graph_layout_deps_exists)):
            error_echo("Dependencies were wrongly installed")
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
def start(port: int = typer.Option(DEFAULT_PORT, "--port", "-p")):
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
        static_dir_exists = Path("./src/haplovis/server/static").exists()
        if (not static_dir_exists):
            error_echo("Cannot start HaplotypeVisualizer because no build/static folder was found")
            return
        else:
            typer.secho("Successfully started the static server!", fg="green")
    except Exception:
        error_echo("Could not start the static server")
        return


    # start backend
    try:
        typer.echo("Starting backend...")
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
