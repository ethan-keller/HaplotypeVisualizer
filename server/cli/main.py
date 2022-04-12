from pathlib import Path
from typing import List, Optional
import typer

APP = typer.Typer(add_completion=False)

# Static variables
VERSION = "0.1.0"
VALID_GRAPH_EXTENSIONS = [".gfa"]
VALID_LAYOUT_EXTENSIONS = [".json"]


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
    # for every file:
    # positions = layout(file)
    # index_tree = indexing(positions)
    # serialized_index_tree = serialize(index_tree)
    # output_file = to_output_file(serialized_index_tree)

    # TODO: add verbose texts
    # TODO: add progress bars

    pass


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
    pass


@APP.callback()
def main(version: Optional[bool] = typer.Option(None, "--version", is_eager=True, callback=version_callback)):
    """
    TODO: Explain CLI workings
    """
    pass


if __name__ == "__main__":
    APP()
