from pathlib import Path

### CHANGE TO PREFERENCE ###
_output_location = "./out"
_server_data_location = "./server/server_data"
### ---- ###




output_location = Path(_output_location).resolve()
server_data_location = Path(_server_data_location).resolve()