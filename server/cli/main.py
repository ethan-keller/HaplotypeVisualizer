from pathlib import Path
from typing import List, Optional
import typer

from layout import Layout
from kdtree import KDTree
from serialization import PickleSerializer
from uuid import uuid4

APP = typer.Typer(add_completion=False)

# Static variables
VERSION = "0.1.0"
VALID_GRAPH_EXTENSIONS = [".gfa"]
VALID_LAYOUT_EXTENSIONS = [".pickle"]


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
        # TODO: add other validation? e.g., file size, ...

    return paths


def version_callback(version: Optional[bool]):
    if version:
        typer.echo(f"CLI version: {VERSION}")


@APP.command()
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
    outputs: Optional[List[Path]] = typer.Option(None, "--outputs", "-o"),
    verbose: bool = typer.Option(False, "--verbose", "-v"),
):
    # TODO: add verbose texts
    # TODO: add progress bars

    for gfa in gfas:
        # TODO: add try except with red text for when layout fails
        layout = Layout.get_layout_from_file(gfa)
        kdtree = KDTree.create_tree_from_layout(layout)
        out_path = PickleSerializer.serialize(kdtree, str(uuid4()) + ".pickle")
        typer.secho(f"Successfully computed layout for {gfa}. Stored at {str(out_path)}", fg="green")

@APP.command()
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
    # for debugging puproses
    # visualization of index tree
    for layout in layouts:
        kdtree: KDTree = PickleSerializer.deserialize(from_file=layout.name)
        kdtree.print()



@APP.callback()
def main(version: Optional[bool] = typer.Option(None, "--version", is_eager=True, callback=version_callback)):
    """
    TODO: Explain CLI workings
    """
    pass


if __name__ == "__main__":
    APP()
