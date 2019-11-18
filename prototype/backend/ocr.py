from PIL import Image
import cv2 as cv
import numpy as np
import pytesseract

import sys
import argparse


ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True,
                help="path to input image file")
args = vars(ap.parse_args())

# load the image from disk
image = cv.imread(args["image"])

# steps to preprocessing the image
gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
gray = cv.bitwise_not(gray)
thresh = cv.threshold(gray, 0, 255, # threshold the image, setting all foreground pixels to
                      cv.THRESH_BINARY | cv.THRESH_OTSU)[1] # 255 and all background pixel to 0

coords = np.column_stack(np.where(thresh > 0))
angle = cv.minAreaRect(coords)[-1]

if angle <-45:
    angle = -(90 + angle)

else:
    angle = -angle

(h, w) = image.shape[:2]
center = (w // 2, h // 2)
M = cv.getRotationMatrix2D(center, angle, 1.0)
preprocessed = cv.warpAffine(image, M, (w, h),
                        flags=cv.INTER_CUBIC, borderMode=cv.BORDER_REPLICATE)

text = pytesseract.image_to_string(preprocessed)
print(text)
