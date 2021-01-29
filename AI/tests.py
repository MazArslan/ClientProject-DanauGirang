import unittest
from access_ai import runAI
import json


class MyTestCase(unittest.TestCase):
    def test_something(self):
        self.assertEqual(True, True)

    def test_image(self):
        find_image_location = "./Examples/aa.jpeg"
        returned_json = runAI(find_image_location, False)
        find_image_json = "./Examples/image.json"
        with open(find_image_json) as json_image:
            known_json = json.load(json_image)

        # change completion time to match
        returned_json['info']['detection_completion_time'] = '0'
        known_json['info']['detection_completion_time'] = '0'

        self.assertEqual(known_json, returned_json)

    def test_folder_scan(self):
        find_folder_location = "./Examples/images/"
        returned_json = runAI(find_folder_location, True)
        find_image_json = "./Examples/folder.json"
        with open(find_image_json) as json_image:
            known_json = json.load(json_image)

        # change completion time to match
        returned_json['info']['detection_completion_time'] = '0'
        known_json['info']['detection_completion_time'] = '0'

        print(returned_json)
        self.assertEqual(known_json, returned_json)


if __name__ == '__main__':
    unittest.main()
