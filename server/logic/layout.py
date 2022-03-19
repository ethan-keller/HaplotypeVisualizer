import json
from subprocess import check_output
from schemas.layout import LayoutAndBounds

def getLayoutAndBounds() -> LayoutAndBounds:
    try:
        out = check_output(["npx", "ts-node", "./cytoscape.ts"], cwd="./graph_layout", shell=True)
        json_out = json.loads(out)
        layout_and_bounds = LayoutAndBounds(**json_out)
    except:
        raise Exception("Could not compute layout and bound positions")

    return layout_and_bounds
