# Wildlife.DATA AI

## Setup
Requirements: 
1. Anaconda / Miniconda
2. Python 

create a venv  ``` conda env create --file environment.yml ```

activate the venv ``` conda activate cameratraps ```

install other requirements ``` pip3 install -r requirements.txt ```

## Available commands

activate the venv ``` conda activate cameratraps ```

to deactivate the venv ```conda deactivate cameratraps```

to run ai python3 ``` python3 run_tf_detector.py megadetector_v3.pb --image_file test-image.jpeg```

to export as json python3 ``` python3 run_tf_detector_batch.py megadetector_v3.pb test-image.jpeg export.json ```