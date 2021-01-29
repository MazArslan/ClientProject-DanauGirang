from flask import Flask
from flask import request
from access_ai import runAI

app = Flask(__name__)

'''
Flask server that enables a endpoint to be connected to the AI  

input (content) = the location of image/folder
:returns JSON as seen in /AI/Examples
author = Maz
'''


# For processing single image
@app.route('/image', methods=['POST'])
def identify_single_image():
    content = request.data.decode('UTF-8')
    print(content)
    try:
        output_json = runAI(content, False)
        return output_json
    except FileNotFoundError:
        return "FileNotFound", 412
    except:
        return "Error", 500


# Process a folder that contains images
@app.route('/folder', methods=['POST'])
def identify_folder():
    content = request.get_json()
    location = content['location']
    try:
        output_json = runAI(location, True)
        return output_json
    except FileNotFoundError:
        return "FileNotFound", 412
    except:
        return "Error", 500


app.run()
