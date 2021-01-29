import os
import json
from megadetect import run_tf_detector
from megadetect import run_tf_detector_batch as tf_detector
from datetime import datetime

'''
Contains all the processing required to enable the AI to work

:returns JSON
author = Maz
# based on megadetect/run_tf_detector_batch
'''


def runAI(image_location, recursive):
    results = None
    detector_file = 'megadetect/megadetector_v3.pb'
    checkpoint_freq = -1
    confidence_threshold = 0.1
    checkpoint_path = None

    print(image_location)
    print(os.path.isfile(image_location))

    # Find the images to score; images can be a directory, may need to recurse
    if os.path.isdir(image_location):
        image_file_names = run_tf_detector.ImagePathUtils.find_images(image_location, recursive)
        print('{} image files found in the input directory'.format(len(image_file_names)))
    # a single image file
    elif os.path.isfile(image_location) and run_tf_detector.ImagePathUtils.is_image_file(image_location):
        image_file_names = [image_location]
        print('A single image at {} is the input file'.format(image_location))
    # a json list of image paths
    elif os.path.isfile(image_location) and image_location('.json'):
        with open(image_location) as f:
            image_file_names = json.load(f)
        print('{} image files found in the json list'.format(len(image_file_names)))
    else:
        print(
            'image_file specified is not a directory, a json list or an image file (or does not have recognizable extensions), exiting.')
        raise FileNotFoundError

    assert len(image_file_names) > 0, 'image_file provided does not point to valid image files'
    assert os.path.exists(image_file_names[0]), 'The first image to be scored does not exist at {}'.format(
        image_file_names[0])

    results = tf_detector.load_and_run_detector_batch(model_file=detector_file,
                                                      image_file_names=image_file_names,
                                                      checkpoint_path=checkpoint_path,
                                                      confidence_threshold=confidence_threshold,
                                                      checkpoint_frequency=checkpoint_freq,
                                                      results=results)

    final_output = {
        'images': results,
        'detection_categories': run_tf_detector.TFDetector.DEFAULT_DETECTOR_LABEL_MAP,
        'info': {
            'detection_completion_time': datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'),
            'format_version': '1.0'
        }
    }
    return final_output
