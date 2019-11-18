from PIL import Image
import cv2 as cv
import numpy as np
import pytesseract

import sys
import argparse


ap = argparse.ArgumentParser()
ap.add_argument('-i', "--image", required=True, help="path to import image file")
args = vars(ap.parse_args())

# load the image from disk
image = cv.imread(args["image"])

text = pytesseract.image_to_string(image)
print(text)


